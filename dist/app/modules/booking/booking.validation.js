"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'Date is required ',
        }),
    }),
});
const updateBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z
            .string({
            required_error: 'Date is required ',
        })
            .optional(),
        status: zod_1.z
            .string({
            required_error: 'Status is required ',
        })
            .optional(),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
    updateBookingZodSchema,
};
