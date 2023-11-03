/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Contact, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IContactFilterRequest } from './contact.interface';
import { contactFieldSearchableFields } from './contact.constant';

const createContact= async (data: Contact): Promise<Contact> => {
  const result = await prisma.contact.create({
    data: data,
  });
  return result;
};

const getAllContact = async (
  filters: IContactFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Contact[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: contactFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.ContactWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.contact.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.contact.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleContact = async (id: string): Promise<Contact | null> => {
  const result = await prisma.contact.findUnique({
    where: { id },
  });
  return result;
};

const updateContact = async (
  id: string,
  payload: Partial<Contact>
): Promise<Contact | null> => {
  const result = await prisma.contact.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteContact= async (id: string): Promise<Contact | null> => {
  const result = await prisma.contact.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ContactService = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
