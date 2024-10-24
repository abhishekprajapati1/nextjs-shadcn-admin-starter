import { PATTERNS } from "@/lib/constants";
import { z } from "zod";

export const formSchema = z.object({
  color: z.string({ message: "Color must be a valid string." }).regex(PATTERNS.hex_color, { message: "Please provide a valid hex color code." }),
});
