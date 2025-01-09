"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsValidation = void 0;
const zod_1 = require("zod");
const createNewsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        contentType: zod_1.z.string({
            required_error: 'Content Type is required ',
        }),
        title: zod_1.z.string({
            required_error: 'Title is required ',
        }),
        date: zod_1.z.string({
            required_error: 'Date is required ',
        }),
        content: zod_1.z.string({
            required_error: 'Content is required ',
        }),
    }),
});
const updateNewsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        contentType: zod_1.z
            .string({
            required_error: 'Content Type is required ',
        })
            .optional(),
        title: zod_1.z
            .string({
            required_error: 'Title is required ',
        })
            .optional(),
        date: zod_1.z
            .string({
            required_error: 'Date is required ',
        })
            .optional(),
        content: zod_1.z
            .string({
            required_error: 'Content is required ',
        })
            .optional(),
    }),
});
exports.NewsValidation = {
    createNewsZodSchema,
    updateNewsZodSchema,
};
