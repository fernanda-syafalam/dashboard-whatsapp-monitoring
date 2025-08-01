import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  alias: z.string().min(1, { message: 'alias is required.' })
});

export type CorporateSchema = z.infer<typeof formSchema>;
