import * as z from 'zod';

import { MuscularGroup } from '../config';

export const newExerciseSchema = z.object({
  name: z.string(),
  description: z.string(),
  video: z.string().url().optional().or(z.literal('')),
  muscularGroups: z.array(z.nativeEnum(MuscularGroup)),
});
