import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(3, { message: "Name too short" })
  .max(50, { message: "Name too long" });

const description = z
  .string()
  .trim()
  .min(20, { message: "Description too short" })
  .max(500, { message: "Description too long" });

export const createProjectSchema = z.object({
  name,
  description,
});
