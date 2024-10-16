import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(15),
    remember_me: z.boolean().default(false),
})