import * as z from 'zod';

import { goalFrequencySchema } from './goalFrequency.schema';
import { goalTypeSchema } from './goalType.schema';

export const weightGoalSchema = z
  .object({
    type: z.lazy(() => goalTypeSchema),
    amount: z.number(),
    frequency: z.lazy(() => goalFrequencySchema),
  })
  .superRefine((values, ctx) => {
    if (values.amount <= 0) {
      ctx.addIssue({
        message: 'El valor debe ser mayor que 0',
        code: z.ZodIssueCode.custom,
        path: ['amount'],
      });
    }
    return true;
  });
