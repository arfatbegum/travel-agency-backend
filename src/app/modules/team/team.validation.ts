import { z } from 'zod';

const createTeamZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required ',
    }),
    designation: z.string({
      required_error: 'Designation is required ',
    }),
    email: z.string({
      required_error: 'Email is required ',
    }),
    contactNo: z.string({
      required_error: 'Contact No is required ',
    }),
  }),
});

const updateTeamZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required ',
      })
      .optional(),
    designation: z
      .string({
        required_error: 'Designation is required ',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required ',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact No is required ',
      })
      .optional(),
  }),
});

export const TeamValidation = {
  createTeamZodSchema,
  updateTeamZodSchema,
};
