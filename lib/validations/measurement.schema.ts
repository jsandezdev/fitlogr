import { z } from 'zod'

export const MeasurementSchema = z.enum([
  'Neck',
  'Shoulders',
  'Chest',
  'Bicep',
  'Waist',
  'Hips',
  'Thigh'
])
