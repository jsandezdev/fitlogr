import { z } from 'zod'

import { goalTypeSchema } from './goalType.schema'
import { MeasurementSchema } from './measurement.schema'
import { unitOfTimeSchema } from './unitOfTime.schema'

export const measurementGoalSchema = z.object({
  measurement: z.lazy(() => MeasurementSchema),
  goalType: z.lazy(() => goalTypeSchema),
  amount: z.number(),
  frequencyAmount: z.number(),
  frequencyUnitOfTime: z.lazy(() => unitOfTimeSchema)
})
