/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IServiceFilterRequest } from '../service/service.interface';
import {
  bookingFieldSearchableFields,
  bookingRelationalFields,
  bookingRelationalFieldsMapper,
} from './booking.constant';

const createBooking = async (
  userId: string,
  serviceId: string,
  date: string
): Promise<any> => {
  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
    },
  });
  if (!service) {
    throw new Error('This service is not available');
  }
  if (service.availableQunatity === 0) {
    throw new Error('This service is fully booked');
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const booking = await transactionClient.booking.create({
      data: {
        date,
        userId,
        serviceId,
        status: 'processing',
      },
      include: {
        user: true,
        service: true,
      },
    });

    await transactionClient.service.update({
      where: {
        id: serviceId,
      },
      data: {
        availableQunatity: service.availableQunatity - 1,
        isBooked: service.availableQunatity - 1 === 0 ? true : false,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: service.price,
        paymentStatus: 'pending',
        bookingId: booking.id,
      },
    });

    return {
      booking: booking,
      payment: payment,
    };
  });

  return booking;
};

const getAllBooking = async (
  filters: IServiceFilterRequest,
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
      service: true,
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
      service: true,
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

const cancelBooking = async (bookingId: string): Promise<any> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
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
          id: bookingId,
        },
        data: {
          status: 'cancelled',
        },
      });

      const availableService = await transactionClient.service.findUnique({
        where: {
          id: booking.serviceId,
        },
      });

      await transactionClient.service.update({
        where: {
          id: booking.serviceId,
        },
        data: {
          availableQunatity: {
            increment: 1,
          },

          isBooked:
            availableService && availableService.availableQunatity + 1 > 0
              ? false
              : true,
        },
      });

      await transactionClient.payment.update({
        where: {
          bookingId,
        },
        data: {
          paymentStatus: 'cancelled',
        },
      });

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
      await transactionClient.payment.update({
        where: {
          bookingId,
        },
        data: {
          paymentStatus: 'confirmed',
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
      await transactionClient.payment.update({
        where: {
          bookingId,
        },
        data: {
          paymentStatus: 'completed',
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
  completedBooking
};
