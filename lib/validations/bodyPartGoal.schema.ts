import { z } from 'zod'

import { BodyPartSchema } from './bodyPart.schema'
import { goalTypeSchema } from './goalType.schema'
import { unitOfTimeSchema } from './unitOfTime.schema'

export const bodyPartGoalSchema = z.object({
  bodyPart: z.lazy(() => BodyPartSchema),
  goalType: z.lazy(() => goalTypeSchema),
  amount: z.number(),
  frequencyAmount: z.number(),
  frequencyUnitOfTime: z.lazy(() => unitOfTimeSchema)
})
