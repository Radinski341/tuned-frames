import { z } from "zod";

export const ContactRequestSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  message: z.string().min(20).max(2000),
  phone: z.string().max(40).optional(),
  projectType: z.string().min(2).max(120),
  budget: z.string().max(120).optional(),
  website: z.string().max(0).optional(),
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;