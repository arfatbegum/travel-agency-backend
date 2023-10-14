import {  Role, User } from '@prisma/client';
import prisma from '../../../shared/prisma';

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


export const SuperAdminService = {
  getMyProfile,
  updateMyProfile,
};
