import { AUTH_MESSAGE } from '@/constants/message-constants';
import { z } from 'zod';

const NAME_VALIDATION_MIN = 2;
const NAME_VALIDATION_MAX = 8;
const NAME_VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]+$/;
const PASSWORD_VALIDATION_MIN = 6;

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(NAME_VALIDATION_MIN, AUTH_MESSAGE.VALIDATION.NAME_LENGTH)
    .max(NAME_VALIDATION_MAX, AUTH_MESSAGE.VALIDATION.NAME_LENGTH)
    .regex(NAME_VALIDATION_REGEX, AUTH_MESSAGE.VALIDATION.NAME_SPECIAL_CHAR),
  email: z.string().trim().email(AUTH_MESSAGE.VALIDATION.EMAIL_INVALID),
  password: z
    .string()
    .trim()
    .min(PASSWORD_VALIDATION_MIN, AUTH_MESSAGE.VALIDATION.PASSWORD_LENGTH)
    .regex(/[^a-zA-Z0-9]/, AUTH_MESSAGE.VALIDATION.PASSWORD_SPECIAL_CHAR),
});

export type FormData = z.infer<typeof schema>;