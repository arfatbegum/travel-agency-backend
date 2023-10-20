/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data: data,
  });
  return result;
};

const getAllFeedback = async () => {
  const result = await prisma.feedback.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedback,
};
