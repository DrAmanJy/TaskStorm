import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name is too long"),

  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional()
    .default(""),
});
