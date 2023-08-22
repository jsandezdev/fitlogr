import { z } from 'zod';

import { GoalType } from '../config';

export const goalTypeSchema = z.nativeEnum(GoalType);
