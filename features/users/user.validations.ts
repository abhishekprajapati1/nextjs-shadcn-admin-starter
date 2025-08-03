import { z } from "zod";

export const userEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().optional(),
  type: z.enum(["superadmin", "admin", "interviewer", "client"]),
});

export type UserEditFormValues = z.infer<typeof userEditSchema>;
