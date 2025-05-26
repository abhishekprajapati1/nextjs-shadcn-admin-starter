import { PATTERNS } from "@/lib/constants";
import { InputOption } from "@/lib/types";
import { z } from "zod";

// Helper for MongoDB ObjectId validation
const isValidObjectId = (value: string) => PATTERNS.mongo_id.test(value);

export enum FrameStyle {
  FULL_FRAME = "FULL_FRAME",
  HALF_FRAME = "HALF_FRAME",
  RIMLESS = "RIMLESS",
}
export const frameStyles: InputOption[] = [
  { label: "Full Frame", value: FrameStyle.FULL_FRAME },
  { label: "Half Frame", value: FrameStyle.HALF_FRAME },
  { label: "Rimless", value: FrameStyle.RIMLESS },
];

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = "UNISEX",
  OTHER = "OTHER",
}

export const genderOptions = Object.values(Gender).map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  value: value,
}));

export enum FrameSize {
  EXTRA_NARROW = "EXTRA_NARROW",
  NARROW = "NARROW",
  MEDIUM = "MEDIUM",
  WIDE = "WIDE",
  EXTRA_WIDE = "EXTRA_WIDE",
}
export const frameSizes: InputOption[] = [
  { label: "Extra Narrow", value: FrameSize.EXTRA_NARROW },
  { label: "Extra Wide", value: FrameSize.EXTRA_WIDE },
  { label: "Medium", value: FrameSize.MEDIUM },
  { label: "Narrow", value: FrameSize.NARROW },
  { label: "Wide", value: FrameSize.WIDE },
];

export const tags: InputOption[] = [
  { label: "Kids", value: "Kids" },
  { label: "Adults", value: "Adults" },
  { label: "Old", value: "Old" },
];
export const formSchema = z.object({
  slug: z.string(),
  seo_title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  model_name: z.string(),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.UNISEX, Gender.OTHER]),

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
  // color_ids: z.array(
  //   z.string().refine(isValidObjectId, {
  //     message: "Invalid MongoDB ObjectId format",
  //   }),
  // ),

  color_ids: z
    .array(
      z.array(
        z.string().refine(isValidObjectId, {
          message: "Invalid MongoDB ObjectId format",
        }),
      ),
    )
    .optional(),

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

export const productSchema = z.object({
  other_images: z.any().optional(),
  thumbnail: z.any().optional(),
});

export const purchaseSchema = z.object({
  power_type_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
  lens_feature_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
  lens_detail_id: z
    .string()
    .refine(isValidObjectId, {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
  product_color_id: z
    .string()
    .refine(isValidObjectId, { message: "Invalid MongoDB ObjectId format" }),
  frame_only: z.boolean().default(false),
  prescription: z
    .discriminatedUnion("type", [
      z.object({
        type: z.literal("photo"),
        image: z.string(),
        comments: z.string(),
      }),
      z.object({
        type: z.literal("fillup"),
        right_sph: z.string(),
        right_cyl: z.string(),
        right_axis: z.string(),
        right_add: z.string(),
        left_sph: z.string(),
        left_cyl: z.string(),
        left_axis: z.string(),
        left_add: z.string(),
        comments: z.string(),
      }),
    ])
    .optional(),
});
