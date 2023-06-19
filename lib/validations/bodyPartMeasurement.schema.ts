import { z } from 'zod'

import { BodyPartSchema } from './bodyPart.schema'

export const bodyPartMeasurementSchema = z.object({
  bodyPart: z.lazy(() => BodyPartSchema),
  amount: z.number()
})
