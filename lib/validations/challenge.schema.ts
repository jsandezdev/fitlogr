import * as z from 'zod'

// import { challengeStatusSchema } from './challengeStatus.schema'
import { measurementGoalSchema } from './measurementGoal.schema'
import { unitOfTimeSchema } from './unitOfTime.schema'
import { weekDaySchema } from './weekDay.schema'
import { weightGoalSchema } from './weightGoal.schema'

export const challengeSchema = z.object({
  // id: z.string().optional(),
  name: z.string(),
  // status: challengeStatusSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  revisionFrequencyNumber: z.number(),
  revisionFrequencyUnitOfTime: unitOfTimeSchema,
  includeRevisionBodyPhotos: z.boolean(),
  includeRevisionBodyWeight: z.boolean(),
  includeRevisionBodyMeasurements: z.boolean(),
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number(),
  includeWeightGoal: z.boolean(),
  includeMeasurementGoals: z.boolean(),
  weightGoal: weightGoalSchema,
  measurementGoals: measurementGoalSchema.array(),
  weeklyTrainingDays: weekDaySchema.array(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
  // userId: z.string()
  // user: userSchema
})
