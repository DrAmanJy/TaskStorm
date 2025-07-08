import { z } from "zod";

export const taskSchema = z.object({
  taskName: z
    .string()
    .trim()
    .min(3, "Task name must be at least 3 characters long")
    .max(50, "Task name must not exceed 50 characters"),

  taskDescription: z
    .string()
    .trim()
    .min(10, "Task description must be at least 10 characters long")
    .max(500, "Task description must not exceed 500 characters"),

  subtasks: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(1, "Subtask title is required")
          .max(50, "Subtask title must not exceed 50 characters"),

        descriptions: z
          .array(
            z
              .string()
              .trim()
              .min(1, "Description must not be empty")
              .max(300, "Each description must not exceed 300 characters")
          )
          .min(1, "At least one description is required"),

        deadline: z
          .string()
          .min(1, "Deadline is required")
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
          }),

        priority: z.enum(["High", "Medium", "Low"], {
          required_error: "Priority is required",
        }),
      })
    )
    .min(1, "At least one subtask is required"),
});
