/* eslint-disable no-unused-vars */
import { News } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createNews = async (data: News): Promise<News> => {
  const result = await prisma.news.create({
    data: data,
    include: {
      reviews: true,
    },
  });
  return result;
};

const getAllNews = async () => {
  return await prisma.news.findMany();
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
