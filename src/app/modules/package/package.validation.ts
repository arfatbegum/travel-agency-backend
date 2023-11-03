import { z } from 'zod';

const createPackageZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required ',
    }),
    location: z.string({
      required_error: 'location is required ',
    }),
    categoryId: z.string({
      required_error: 'category is required ',
    }),
    price: z.number({
      required_error: 'Password is required ',
    }),
    person: z.number({
      required_error: 'person is required ',
    }),
    duration: z.string({
      required_error: 'duration is required ',
    }),
    description: z.string({
      required_error: 'duration is required ',
    }),
    facilities: z
      .string({
        required_error: 'facilities is required ',
      })
      .optional(),
    whyChooseUs: z
      .string({
        required_error: 'whyChooseUs is required ',
      })
      .optional(),
    image: z
      .string({
        required_error: 'image is required ',
      })
      .optional(),
  }),
});

const updatePackageZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required ',
      })
      .optional(),
    location: z
      .string({
        required_error: 'location is required ',
      })
      .optional(),
    categoryId: z
      .string({
        required_error: 'category is required ',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Password is required ',
      })
      .optional(),
    person: z
      .number({
        required_error: 'person is required ',
      })
      .optional(),
    duration: z
      .string({
        required_error: 'duration is required ',
      })
      .optional(),
    description: z
      .string({
        required_error: 'duration is required ',
      })
      .optional(),
    facilities: z
      .string({
        required_error: 'facilities is required ',
      })
      .optional(),
    whyChooseUs: z
      .string({
        required_error: 'whyChooseUs is required ',
      })
      .optional(),
    image: z
      .string({
        required_error: 'image is required ',
      })
      .optional(),
  }),
});

export const PackageValidation = {
  createPackageZodSchema,
  updatePackageZodSchema,
};
