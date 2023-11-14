/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import paypal from 'paypal-rest-sdk';
import config from '../../../config';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { refundPayPalPayment } from '../../middlewares/refundPayPalPayment';
import { IPackageFilterRequest } from '../package/package.interface';
import {
  bookingFieldSearchableFields,
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
} from './booking.constant';
import { ICreatePaymentJson } from './booking.interface';

// Configure PayPal SDK with your sandbox (test) credentials
paypal.configure({
  mode: config.paypal.mode,
  client_id: config.paypal.client_id as string,
  client_secret: config.paypal.client_secret as string,
});

const createBooking = async (
  userId: string,
  packageId: string,
  date: string,
  adult: number,
  details: any
): Promise<any> => {
  const {
    paymentMethod,
    paypalEmail,
    paymentStatus,
    paypalPayerId,
    paypalTransactionId,
  } = details;

  const tourPackage = await prisma.package.findUnique({
    where: {
      id: packageId,
    },
  });

  if (!tourPackage) {
    throw new Error('This package is not available');
  }

  if (tourPackage.availableQunatity === 0) {
    throw new Error('This package is fully booked');
  }

  const paymentAmount = tourPackage.price.toFixed(2).toString();

  // Create a PaymentInfo record
  const paymentInfo = await prisma.paymentInfo.create({
    data: {
      paymentMethod,
      paypalEmail,
      paymentStatus,
      paypalPayerId,
      paypalTransactionId,
    },
  });

  // Retrieve the paymentInfoId
  const paymentInfoId = paymentInfo.id;
  console.log(paymentInfoId);

  // Define the PayPal payment creation JSON
  const createPaymentJson: ICreatePaymentJson = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
    transactions: [
      {
        amount: {
          total: paymentAmount,
          currency: 'USD',
        },
        description: 'Your order description here',
      },
    ],
  };

  // Create a PayPal payment
  const paymentResponse = await new Promise<paypal.PaymentResponse>(
    (resolve, reject) => {
      paypal.payment.create(createPaymentJson, (error, payment) => {
        if (error) {
          reject(new Error('Error processing payment'));
        } else {
          resolve(payment);
        }
      });
    }
  );
  if (!paymentResponse.links) {
    throw new Error('PayPal links are missing in the response');
  }

  // Save the PayPal payment ID and payment information to the Booking record
  const booking = await prisma.booking.create({
    data: {
      date,
      adult,
      userId,
      packageId,
      status: 'processing',
      paymentInfoId: paymentInfoId,
    },
    include: {
      user: true,
      package: true,
      paymentInfo: true,
    },
  });

  // Update package availability
  await prisma.package.update({
    where: {
      id: packageId,
    },
    data: {
      availableQunatity: tourPackage.availableQunatity - 1,
      isBooked: tourPackage.availableQunatity - 1 === 0,
    },
  });

  // Redirect the user to PayPal's approval URL
  for (let i = 0; i < paymentResponse.links.length; i++) {
    if (paymentResponse.links[i].rel === 'approval_url') {
      return {
        approvalUrl: paymentResponse.links[i].href,
        booking,
      };
    }
  }

  // Return the booking and payment information
  return {
    booking,
    paymentResponse,
  };
};

const getAllBooking = async (
  filters: IPackageFilterRequest,
  options: IPaginationOptions
): Promise<Booking[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookingRelationalFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    include: {
      user: true,
      package: true,
      paymentInfo: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.booking.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      package: true,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  booking: Booking
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id: id,
    },
    data: booking,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const cancelBooking = async (id: string) => {
  console.log(id);
  const booking = await prisma.booking.findUnique({
    where: {
      id: id,
    },
  });
  if (!booking) {
    throw new Error('Booking does not exist');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking has already been cancelled');
  }

  if (booking.status === 'Completed') {
    throw new Error('Booking has already been completed');
  }

  const cancelledBooking = await prisma.$transaction(
    async transactionClient => {
      const bookingToCancel = await transactionClient.booking.update({
        where: {
          id: id,
        },
        data: {
          status: 'cancelled',
        },
      });

      const availablePackage = await transactionClient.package.findUnique({
        where: {
          id: booking.packageId,
        },
      });

      await transactionClient.package.update({
        where: {
          id: booking.packageId,
        },
        data: {
          availableQunatity: {
            increment: 1,
          },
          isBooked:
            availablePackage && availablePackage.availableQunatity + 1 > 0
              ? false
              : true,
        },
      });

      // Initiate the PayPal refund
      await refundPayPalPayment(booking.paymentInfoId, booking.packageId);

      return {
        booking: bookingToCancel,
      };
    }
  );

  return cancelledBooking;
};

const confirmBooking = async (bookingId: string): Promise<any> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error('Booking does not exist');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking has cancelled');
  }

  if (booking.status === 'confirmed') {
    throw new Error('Booking has already been confirmed');
  }

  if (booking.status === 'Completed') {
    throw new Error('Booking has already been completed');
  }

  const confirmedBooking = await prisma.$transaction(
    async transactionClient => {
      const bookingToConfirm = await transactionClient.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'confirmed',
        },
      });
      return {
        booking: bookingToConfirm,
      };
    }
  );

  return confirmedBooking;
};

const completedBooking = async (bookingId: string): Promise<any> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error('Booking does not exist');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking has cancelled');
  }

  if (booking.status === 'confirmed') {
    throw new Error('Booking been confirmed');
  }

  if (booking.status === 'Completed') {
    throw new Error('Booking has already been completed');
  }

  const completedBooking = await prisma.$transaction(
    async transactionClient => {
      const bookingToConfirm = await transactionClient.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: 'completed',
        },
      });
      return {
        booking: bookingToConfirm,
      };
    }
  );

  return completedBooking;
};

export const BookingServices = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  confirmBooking,
  completedBooking,
};
