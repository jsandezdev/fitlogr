import { z } from 'zod'

import { WeekDay } from '../config'

export const weekDaySchema = z.nativeEnum(WeekDay)
