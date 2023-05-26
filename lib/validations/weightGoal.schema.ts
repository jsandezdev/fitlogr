import * as z from 'zod'

import { goalTypeSchema } from './goalType.schema'
import { unitOfTimeSchema } from './unitOfTime.schema'

export const weightGoalSchema = z.object({
  goalType: z.lazy(() => goalTypeSchema),
  amount: z.number(),
  frequencyAmount: z.number(),
  frequencyUnitOfTime: z.lazy(() => unitOfTimeSchema)
})
