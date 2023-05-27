import { z } from 'zod'

import { ChallengeStatus } from '../config'

export const challengeStatusSchema = z.nativeEnum(ChallengeStatus)
