import { z } from 'zod'

import { unitOfTimeSchema } from './unitOfTime.schema'

export const challengeDurationSchema = z.object({
  id: z.string(),
  label: z.string(),
  unitOfTime: z.lazy(() => unitOfTimeSchema).nullable(),
  amount: z.number()
})
