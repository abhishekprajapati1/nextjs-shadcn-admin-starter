import { z } from "zod";

export const brandSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  description: z.string().optional()
});
