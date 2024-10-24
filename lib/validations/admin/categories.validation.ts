import { z } from "zod";

export const formSchema = z.object({
  image: z.any().optional(),
  power_type_id: z.string().min(1, { message: "Please select a power type." }),
  title: z.string().min(1, { message: "Please enter a title" }),
  description: z.string().optional()
  
});
