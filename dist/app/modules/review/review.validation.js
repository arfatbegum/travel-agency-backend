"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({
            required_error: 'Rating is required ',
        }),
        comment: zod_1.z.string({
            required_error: 'comment is required ',
        }),
    }),
});
const updateReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z
            .number({
            required_error: 'Rating is required ',
        })
            .optional(),
        comment: zod_1.z
            .string({
            required_error: 'comment is required ',
        })
            .optional(),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
    updateReviewZodSchema,
};
