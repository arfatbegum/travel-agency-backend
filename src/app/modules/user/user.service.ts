/* eslint-disable no-unused-vars */
import { Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../../shared/prisma';

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

const getAllUsers = async () => {
  return await prisma.user.findMany();
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

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteAUser,
  getMyProfile,
};
