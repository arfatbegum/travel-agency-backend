/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Feedback, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { feedbackFieldSearchableFields } from './feedback.constant';
import { IFeedbackFilterRequest } from './feedback.interface';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data: data,
  });
  return result;
};

const getAllFeedback = async (
  filters: IFeedbackFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Feedback[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: feedbackFieldSearchableFields.map(field => ({
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

  const whereConditons: Prisma.FeedbackWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.feedback.findMany({
    include: {
      user: true,
    },
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

  const total = await prisma.feedback.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFeedback = async (id: string) => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateFeedback = async (
  id: string,
  payload: Partial<Feedback>
): Promise<Feedback | null> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedback,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
