import { z } from "zod";

export const userRegister = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().min(3, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(16, { message: "Password must be max 16 characters" }),
});
