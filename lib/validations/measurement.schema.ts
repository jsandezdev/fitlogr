import { z } from 'zod'

import { Measurement } from '../config'

export const MeasurementSchema = z.nativeEnum(Measurement)
