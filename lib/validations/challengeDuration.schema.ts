import { z } from 'zod';

import { ChallengeDuration } from '../config';

export const challengeDurationSchema = z.nativeEnum(ChallengeDuration);
