import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required ',
    }),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required ',
      })
      .optional(),
  }),
});

export const categoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
