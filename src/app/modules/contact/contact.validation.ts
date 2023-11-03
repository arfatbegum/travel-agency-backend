import { z } from 'zod';

const createContactZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required ',
    }),
    email: z.string({
      required_error: 'Email is required ',
    }),
    conatctNo: z.string({
      required_error: 'Contact No is required ',
    }),
    message: z.string({
      required_error: 'Message is required ',
    }),
  }),
});

const updateContactZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required ',
      })
      .optional(),
    status: z
      .string({
        required_error: 'Status is required ',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required ',
      })
      .optional(),
    conatctNo: z
      .string({
        required_error: 'Contact No is required ',
      })
      .optional(),
    message: z
      .string({
        required_error: 'Message is required ',
      })
      .optional(),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
  updateContactZodSchema,
};
