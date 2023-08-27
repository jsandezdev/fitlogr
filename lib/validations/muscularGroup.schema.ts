import { z } from 'zod';

import { MuscularGroup } from '../config';

export const muscularGroupSchema = z.nativeEnum(MuscularGroup);
