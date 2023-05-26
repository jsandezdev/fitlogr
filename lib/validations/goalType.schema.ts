import { z } from 'zod'

export const goalTypeSchema = z.enum(['Gain', 'Lose'])
