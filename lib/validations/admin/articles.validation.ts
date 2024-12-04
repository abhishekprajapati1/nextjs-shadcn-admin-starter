import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  seo_title: z.string().min(1, "Please provide a seo friendly title."),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.any().optional(), // Optional for image upload
  keywords: z.array(z.string()).min(1, "Please add at least one keyword"),
  slug: z.string().optional(), // Slug is now optional
  shape_ids: z.array(z.string()).optional(), // Shapes is now optional
  category_ids: z.array(z.string()).optional(), // category is now optional
  product_ids: z.array(z.string()).optional(), // products is now optional
});
