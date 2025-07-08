import { z } from "zod";

const email = z.string().trim().toLowerCase().email("Invalid email address");
const password = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters");
const name = z.string().trim().min(3, "Name must be at least 3 characters");

export const loginSchema = z.object({
  userEmail: email,
  userPassword: password,
});

export const signupSchema = z.object({
  userName: name,
  userEmail: email,
  userPassword: password,
});
