import { z } from "zod";

export const subtaskSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    descriptions: z
      .array(
        z.object({
          value: z
            .string()
            .min(5, "Each description must be at least 5 characters"),
        })
      )
      .min(1, "At least one description is required"),
    deadline: z.string().optional(),
    priority: z.enum(["High", "Medium", "Low"], {
      required_error: "Priority is required",
    }),
  })
  .transform((data) => ({
    ...data,
    descriptions: data.descriptions.map((desc) => desc.value),
  }));
