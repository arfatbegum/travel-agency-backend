/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { Booking, Prisma, Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IUserFilterRequest } from './user.interface';
import { userFieldSearchableFields, userFilterableFields, userRelationalFieldsMapper } from './user.constant';

const createUser = async (data: User): Promise<User> => {
  const { name, email, password, contactNo, address, profileImg } = data;

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address');
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error('BCRYPT_SALT_ROUNDS is not properly configured.');
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'user',
      contactNo,
      address,
      profileImg,
    },
  });

  return user;
};

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<User[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userFieldSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (userFilterableFields.includes(key)) {
          return {
            [userRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    include: {
      reviews: true,
      bookings:true
    },
    where: {
      AND: [
        {
          role: 'user',
        },
        whereConditions,
      ],
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.user.count({
    where: {
      AND: [
        {
          role: 'user',
        },
        whereConditions,
      ],
    },
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

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const getMyProfile = async (
  userId: string,
  userRole: Role
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      role: userRole,
    },
  });
  return result;
};

const updateMyProfile = async (
  userId: string,
  userRole: Role,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id: userId,
      role: userRole,
    },
    data: payload,
  });
  return result;
};

const getMyBooking = async (
  userId: string
): Promise<Booking[] | null> => {
  const result = await prisma.booking.findMany({
    where: {
      userId: userId
    },
    include: {
      service: true,
      user: true,
    },
  });
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteAUser,
  getMyProfile,
  updateMyProfile,
  getMyBooking,
};
