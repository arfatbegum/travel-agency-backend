/* eslint-disable no-unused-vars */
import { Review } from '@prisma/client';
import prisma from '../../../shared/prisma';

const addReview = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: data,
    include: {
      user: true,
      package: true,
    },
  });

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      user: true,
      package: true,
    },
  });
  const total = await prisma.review.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: { id },
  });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>
): Promise<Review | null> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewService = {
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
