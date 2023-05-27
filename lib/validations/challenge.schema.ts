import * as z from 'zod'

// import { challengeStatusSchema } from './challengeStatus.schema'
import { bodyPartGoalSchema } from './bodyPartGoal.schema'
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
  includeRevisionBodyParts: z.boolean(),
  includeDietLog: z.boolean(),
  monthlyCheatMeals: z.number(),
  includeWeightGoal: z.boolean(),
  includeBodyPartGoals: z.boolean(),
  weightGoal: weightGoalSchema,
  bodyPartGoals: bodyPartGoalSchema.array(),
  weeklyTrainingDays: weekDaySchema.array(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
  // userId: z.string()
  // user: userSchema
})
