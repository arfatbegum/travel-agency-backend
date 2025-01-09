"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageValidation = void 0;
const zod_1 = require("zod");
const createPackageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required ',
        }),
        location: zod_1.z.string({
            required_error: 'location is required ',
        }),
        categoryId: zod_1.z.string({
            required_error: 'category is required ',
        }),
        price: zod_1.z.number({
            required_error: 'Password is required ',
        }),
        people: zod_1.z.number({
            required_error: 'people is required ',
        }),
        duration: zod_1.z.string({
            required_error: 'duration is required ',
        }),
        description: zod_1.z.string({
            required_error: 'duration is required ',
        }),
        facilities: zod_1.z
            .string({
            required_error: 'facilities is required ',
        })
            .optional(),
        whyChooseUs: zod_1.z
            .string({
            required_error: 'whyChooseUs is required ',
        })
            .optional(),
        image: zod_1.z
            .string({
            required_error: 'image is required ',
        })
            .optional(),
    }),
});
const updatePackageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required ',
        })
            .optional(),
        location: zod_1.z
            .string({
            required_error: 'location is required ',
        })
            .optional(),
        categoryId: zod_1.z
            .string({
            required_error: 'category is required ',
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: 'Password is required ',
        })
            .optional(),
        people: zod_1.z
            .number({
            required_error: 'person is required ',
        })
            .optional(),
        duration: zod_1.z
            .string({
            required_error: 'duration is required ',
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'duration is required ',
        })
            .optional(),
        facilities: zod_1.z
            .string({
            required_error: 'facilities is required ',
        })
            .optional(),
        whyChooseUs: zod_1.z
            .string({
            required_error: 'whyChooseUs is required ',
        })
            .optional(),
        image: zod_1.z
            .string({
            required_error: 'image is required ',
        })
            .optional(),
    }),
});
exports.PackageValidation = {
    createPackageZodSchema,
    updatePackageZodSchema,
};
