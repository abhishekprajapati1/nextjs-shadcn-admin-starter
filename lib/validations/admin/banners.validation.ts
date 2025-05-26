import { IMAGE_RATIO } from "@/lib/constants";
import { z } from "zod";

export const formSchema = z.object({
  type: z.enum(["masonry", "grid", "carousel"]),
  title: z.string().optional(),
  is_active: z.boolean().optional(),
  show_on_home: z.boolean().optional(),
  category_ids: z.array(z.string()),
  shape_ids: z.array(z.string()),
});

export const bannerImageSchema = z.object({
  url: z.string().url().optional(),
  width: z.number().min(0),
  aspect_ratio: z.enum([...Object.keys(IMAGE_RATIO)] as [string, ...string[]]),
});
