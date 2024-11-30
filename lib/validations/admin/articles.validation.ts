import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  seo_title: z.string().min(1, "Please provide a seo friendly title."),
  description: z.string().min(1, "Description is required"),
  image: z.any().optional(), // Optional for image upload
  keywords: z.array(z.string()).min(1, "Please add at least one keyword"),
});