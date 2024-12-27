import { PATTERNS } from "@/lib/constants";
import { Gender } from "@/lib/types";
import { z } from "zod";

// Helper for MongoDB ObjectId validation
const isValidObjectId = (value: string) => PATTERNS.mongo_id.test(value);
export enum FrameStyle {
  FULL_FRAME = "FULL_FRAME",
  HALF_FRAME = "HALF_FRAME",
  RIMLESS = "RIMLESS",
}

export enum FrameSize {
  EXTRA_NARROW = "EXTRA_NARROW",
  NARROW = "NARROW",
  MEDIUM = "MEDIUM",
  WIDE = "WIDE",
  EXTRA_WIDE = "EXTRA_WIDE",
}
export const formSchema = z.object({
  seo_title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  model_name: z.string(),
  model_number: z.number().int().positive(),
  gender: z.nativeEnum(Gender),

  stock_quantity: z.number().int().min(0),

  lens_width: z.number().positive(),

  lens_height: z.number().positive(),

  frame_width: z.number().positive(),

  listing_price: z.number().positive(),

  price: z.number().positive(),

  raw_material_sourced_from: z
    .string()
    .optional()
    .default("Imported International"),

  lens_material: z.string().optional().default("Demo Polycorbonate"),

  frame_style: z.enum([
    FrameStyle.FULL_FRAME,
    FrameStyle.HALF_FRAME,
    FrameStyle.RIMLESS,
  ]),

  frame_size: z
    .array(
      z.enum([
        FrameSize.EXTRA_NARROW,
        FrameSize.EXTRA_WIDE,
        FrameSize.MEDIUM,
        FrameSize.NARROW,
        FrameSize.WIDE,
      ]),
    )
    .min(1),

  power_type_ids: z.array(
    z.string().refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    }),
  ),

  color_ids: z.array(
    z.string().refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    }),
  ),

  shape_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),

  frame_material_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),

  category_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
});
