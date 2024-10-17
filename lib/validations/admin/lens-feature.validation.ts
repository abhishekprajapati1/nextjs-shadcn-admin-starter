import { z } from "zod";

export const lensFeatureSchema = z.object({
  image: z.any().optional(),
  title: z.string().min(1, { message: "Please enter a title" }),
  description: z.string().min(5, {
    message: "The description should be at least 5 character long.",
  }),
});
