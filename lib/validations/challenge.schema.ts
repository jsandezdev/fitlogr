import * as z from 'zod'

import { measurementGoalSchema } from './measurementGoal.schema'
import { unitOfTimeSchema } from './unitOfTime.schema'
import { userSchema } from './user.schema'
import { weekDaySchema } from './weekDay.schema'
import { weightGoalSchema } from './weightGoal.schema'

export const challengeSchema = z.object({
  // id: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  revisionFrequencyNumber: z.number(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema,
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyMeasurements: z.boolean(),
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number(),
  includeGoals: z.boolean(),
  weightGoal: weightGoalSchema,
  measurementGoals: measurementGoalSchema.array(),
  weeklyTrainingDays: weekDaySchema.array(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
  // user: userSchema
})
