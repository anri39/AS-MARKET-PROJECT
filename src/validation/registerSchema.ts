import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    username: z.string().min(3, "Username must be at least 3 characters"),
    acceptTerms: z
      .boolean()
      .refine((v) => v === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
