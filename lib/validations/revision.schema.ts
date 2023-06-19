import * as z from 'zod'

import { bodyPartMeasurementSchema } from './bodyPartMeasurement.schema'

export const revisionSchema = z.object({
  date: z.coerce.date(),
  // challengeId: z.string(),
  bodyWeight: z.number().optional().nullable(),
  frontPhoto: z.string().optional().nullable(),
  sidePhoto: z.string().optional().nullable(),
  backPhoto: z.string().optional().nullable(),
  bodyPartMeasurements: bodyPartMeasurementSchema.array(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
})
