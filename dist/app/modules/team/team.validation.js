"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamValidation = void 0;
const zod_1 = require("zod");
const createTeamZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required ',
        }),
        designation: zod_1.z.string({
            required_error: 'Designation is required ',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required ',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact No is required ',
        }),
    }),
});
const updateTeamZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required ',
        })
            .optional(),
        designation: zod_1.z
            .string({
            required_error: 'Designation is required ',
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
    }),
});
exports.TeamValidation = {
    createTeamZodSchema,
    updateTeamZodSchema,
};
