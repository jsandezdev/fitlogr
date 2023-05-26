import { z } from 'zod'

import { unitsOfTime } from '../config'

export const unitOfTimeSchema = z.enum(unitsOfTime)
