/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Prisma, Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  adminFieldSearchableFields,
  adminRelationalFieldsMapper,
} from './admin.constant';
import { IAdminFilterRequest } from './admin.interface';

const createAdmin = async (data: User): Promise<User> => {
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
      role: 'admin',
      contactNo,
      address,
      profileImg,
    },
    include: {
      news: true,
    },
  });

  return user;
};

const getAllAdmins = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions
): Promise<User[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: adminFieldSearchableFields.map((field) => ({
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
        if (adminFieldSearchableFields.includes(key)) {
          return {
            [adminRelationalFieldsMapper[key]]: {
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
    },
    where: {
      AND: [
        {
          role: 'admin',
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
          role: 'admin',
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


const getSingleAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

const updateAdmin = async (
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

const deleteAdmin = async (id: string): Promise<User | null> => {
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


export const AdminService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getMyProfile,
  updateMyProfile,
};
