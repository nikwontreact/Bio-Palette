import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  projectType: z.enum(['freelance', 'fulltime', 'consultation', 'other']).optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});
