import { z } from 'zod';

import { GoalFrequency } from '../config';

export const goalFrequencySchema = z.nativeEnum(GoalFrequency);
