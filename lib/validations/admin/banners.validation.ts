import { z } from "zod";

export const formSchema = z.object({
  is_active: z.boolean().optional(),
  show_on_home: z.boolean().optional(),
  category_ids: z.array(z.string()),
  shape_ids: z.array(z.string()),
});
