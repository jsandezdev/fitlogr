import { z } from 'zod'

import { BodyPartSchema } from './bodyPart.schema'

export const measurementSchema = z.object({
  bodyPart: z.lazy(() => BodyPartSchema),
  amount: z.number()
})
