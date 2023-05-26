import { z } from 'zod'

import { UnitOfTime } from '../config'

export const unitOfTimeSchema = z.nativeEnum(UnitOfTime)
