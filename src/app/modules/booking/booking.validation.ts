import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required ',
    }),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    date: z
      .string({
        required_error: 'Date is required ',
      })
      .optional(),
    status: z
      .string({
        required_error: 'Status is required ',
      })
      .optional(),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
