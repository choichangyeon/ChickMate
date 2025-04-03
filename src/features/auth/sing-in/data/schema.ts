import { AUTH_MESSAGE } from '@/constants/message-constants';
import { z } from 'zod';

const PASSWORD_VALIDATION_MIN = 1;

const { VALIDATION } = AUTH_MESSAGE;
const { EMAIL_EMPTY_FIELD, PASSWORD_EMPTY_FIELD } = VALIDATION;

export const schema = z.object({
  email: z.string().trim().email(EMAIL_EMPTY_FIELD),
  password: z.string().trim().min(PASSWORD_VALIDATION_MIN, PASSWORD_EMPTY_FIELD),
});

export type SignInFormData = z.infer<typeof schema>;
