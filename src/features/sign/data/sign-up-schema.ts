import { AUTH_MESSAGE } from '@/constants/message-constants';
import { z } from 'zod';

const NAME_VALIDATION_MIN = 2;
const NAME_VALIDATION_MAX = 8;
const NAME_VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]+$/;
const PASSWORD_VALIDATION_MIN = 6;

const { VALIDATION } = AUTH_MESSAGE;
const { NAME_LENGTH, NAME_SPECIAL_CHAR, EMAIL_INVALID, PASSWORD_LENGTH, PASSWORD_SPECIAL_CHAR, PASSWORD_CHECK } =
  VALIDATION;

export const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(NAME_VALIDATION_MIN, NAME_LENGTH)
      .max(NAME_VALIDATION_MAX, NAME_LENGTH)
      .regex(NAME_VALIDATION_REGEX, NAME_SPECIAL_CHAR),
    email: z.string().trim().email(EMAIL_INVALID),
    password: z
      .string()
      .trim()
      .min(PASSWORD_VALIDATION_MIN, PASSWORD_LENGTH)
      .regex(/[^a-zA-Z0-9]/, PASSWORD_SPECIAL_CHAR),
    passwordCheck: z.string().trim(),
  })
  .refine(
    (data) => data.password === data.passwordCheck,

    { message: PASSWORD_CHECK, path: ['passwordCheck'] }
  );

export type SignUpFormData = z.infer<typeof schema>;
