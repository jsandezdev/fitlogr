import * as z from 'zod'

import { measurementSchema } from './measurement.schema'

export const revisionSchema = z.object({
  date: z.coerce.date(),
  // challengeId: z.string(),
  weight: z.number().optional().nullable(),
  frontPhoto: z.string().optional().nullable(),
  sidePhoto: z.string().optional().nullable(),
  backPhoto: z.string().optional().nullable(),
  measurements: measurementSchema.array(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
})
