import { z } from "zod";

export const taxSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type TaxFormValues = z.infer<typeof taxSchema>;
