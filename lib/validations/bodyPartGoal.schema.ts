import { z } from 'zod'

import { BodyPartSchema } from './bodyPart.schema'
import { goalFrequencySchema } from './goalFrequency.schema'
import { goalTypeSchema } from './goalType.schema'

export const bodyPartGoalSchema = z.object({
  bodyPart: z.lazy(() => BodyPartSchema),
  type: z.lazy(() => goalTypeSchema),
  amount: z.number(),
  frequency: z.lazy(() => goalFrequencySchema)
}).superRefine((values, ctx) => {
  if (values.amount <= 0) {
    ctx.addIssue({
      message: 'El valor debe ser mayor que 0',
      code: z.ZodIssueCode.custom,
      path: ['amount']
    })
  }
  return true
})
