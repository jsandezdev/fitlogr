import { z } from 'zod';

import { challengeSchema } from './newChallenge.schema';
// import { accountSchema } from './account.schema'
// import { sessionSchema } from './session.schema'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  hashedPassword: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  challenges: challengeSchema.array(),
  // accounts: accountSchema.array(),
  // sessions: sessionSchema.array()
});
