import { z } from "zod";
import { role } from "../auth/auth.constants";

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Phone Number is required ",
    }),
    email: z.string({
      required_error: "Phone Number is required ",
    }),
    contactNo: z.string({
      required_error: "Phone Number is required ",
    }),
    password: z.string({
      required_error: "Password is required ",
    }),
    address: z.string({
      required_error: "Address is required ",
    }),
   }),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required ",
    }).optional(),
    email: z.string({
      required_error: "Email is required ",
    }).optional(),
    password: z.string({
      required_error: "Password is required ",
    }).optional(),
      role: z.enum([...role] as [string, ...string[]]).optional(),
    contactNo: z.string({
      required_error: "Contact No is required ",
    }).optional(),
    address: z.string({
      required_error: "Address is required ",
    }).optional(),
    profileImg: z.string({
      required_error: "Profile img is required ",
    }).optional(),
   }),
});


export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema
};
