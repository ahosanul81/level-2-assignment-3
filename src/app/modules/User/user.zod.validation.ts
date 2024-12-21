import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z.string({ required_error: "email is required" }),
  password: z.string({ required_error: "password is required" }),
  role: z.string().optional(),
});
const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
