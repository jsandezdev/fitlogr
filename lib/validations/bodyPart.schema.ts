import { z } from 'zod';

import { BodyPart } from '../config';

export const BodyPartSchema = z.nativeEnum(BodyPart);
