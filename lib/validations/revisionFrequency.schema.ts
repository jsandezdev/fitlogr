import { z } from 'zod';

import { RevisionFrequency } from '../config';

export const revisionFrequencySchema = z.nativeEnum(RevisionFrequency);
