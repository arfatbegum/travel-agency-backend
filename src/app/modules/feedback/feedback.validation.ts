import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is required ',
    }),
    suggestions: z.string({
      required_error: 'Suggestions is required ',
    }),
  }),
});

const updateFeedbackZodSchema = z.object({
  body: z.object({
    comment: z
      .string({
        required_error: 'Comment is required ',
      })
      .optional(),
    suggestions: z
      .string({
        required_error: 'Suggestions is required ',
      })
      .optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
  updateFeedbackZodSchema,
};
