/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { News, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { newsFieldSearchableFields } from './news.constant';
import { INewsFilterRequest } from './news.interface';

const createNews = async (data: News): Promise<News> => {
  const result = await prisma.news.create({
    data: data,
    include: {
      reviews: true,
    },
  });
  return result;
};

const getAllNews = async (
  filters: INewsFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<News[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: newsFieldSearchableFields.map(field => ({
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

  const whereConditons: Prisma.NewsWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.news.findMany({
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

  const total = await prisma.news.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleNews = async (id: string): Promise<News | null> => {
  const result = await prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      reviews: true,
    },
  });
  return result;
};

const updateNews = async (
  id: string,
  payload: Partial<News>
): Promise<News | null> => {
  const result = await prisma.news.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteNews = async (id: string): Promise<News | null> => {
  const result = await prisma.news.delete({
    where: {
      id,
    },
  });
  return result;
};

export const NewsService = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
};
