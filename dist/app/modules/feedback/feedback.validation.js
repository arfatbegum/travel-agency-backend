"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({
            required_error: 'Comment is required ',
        }),
        suggestions: zod_1.z.string({
            required_error: 'Suggestions is required ',
        }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z
            .string({
            required_error: 'Comment is required ',
        })
            .optional(),
        suggestions: zod_1.z
            .string({
            required_error: 'Suggestions is required ',
        })
            .optional(),
    }),
});
exports.FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
};
