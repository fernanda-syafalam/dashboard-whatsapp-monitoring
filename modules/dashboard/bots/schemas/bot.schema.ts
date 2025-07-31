import { z } from 'zod';

export const botSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  corporateID: z.string().min(1, { message: 'Corporate ID is required.' })
});

export type BotSchema = z.infer<typeof botSchema>;
