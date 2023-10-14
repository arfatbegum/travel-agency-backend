/* eslint-disable no-unused-vars */
import { FAQ } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaq = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data: data,
  });
  return result;
};

const getAllFaq = async () => {
  return await prisma.fAQ.findMany();
};

const getSingleFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: { id },
  });
  return result;
};

const updateFaq = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ | null> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });
  return result;
};

export const FaqService = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
