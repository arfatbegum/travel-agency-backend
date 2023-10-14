import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required ',
    }),
    comment: z.number({
      required_error: 'comment is required ',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z
      .number({
        required_error: 'Rating is required ',
      })
      .optional(),
    comment: z
      .number({
        required_error: 'comment is required ',
      })
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
