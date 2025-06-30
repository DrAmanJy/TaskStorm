import { z } from "zod";

export const registerSchema = z.object({
  userName: z.string().trim().min(3, "Name must be at least 3 characters"),
  userEmail: z.string().trim().toLowerCase().email("Invalid email"),
  userPassword: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters"),
});
