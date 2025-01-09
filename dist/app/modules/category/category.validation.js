"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required ',
        }),
    }),
});
const updateCategoryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required ',
        })
            .optional(),
    }),
});
exports.categoryValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema,
};
