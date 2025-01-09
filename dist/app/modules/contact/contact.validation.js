"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
const createContactZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required ',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required ',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required ',
        }),
        message: zod_1.z.string({
            required_error: 'Message is required ',
        }),
    }),
});
const updateContactZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required ',
        })
            .optional(),
        status: zod_1.z
            .string({
            required_error: 'Status is required ',
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'Email is required ',
        })
            .optional(),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact No is required ',
        })
            .optional(),
        message: zod_1.z
            .string({
            required_error: 'Message is required ',
        })
            .optional(),
    }),
});
exports.ContactValidation = {
    createContactZodSchema,
    updateContactZodSchema,
};
