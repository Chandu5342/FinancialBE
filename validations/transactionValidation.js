import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  categoryId: z.string(),
  date: z.string(),
  notes: z.string().optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();