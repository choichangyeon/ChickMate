import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { z } from 'zod';
const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;
const { VALIDATION } = USER_META_DATA_FORM_MESSAGE;

/**
 * user metadata form의 validation schema
 */
export const userMetaFormSchema = z.object({
  [EXPERIENCE_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[EXPERIENCE_NAME]),
  [REQUIRED_EDUCATION_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[REQUIRED_EDUCATION_NAME]),
  [JOB_MID_CODE_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[JOB_MID_CODE_NAME]),
  [LOCATION_NAME]: z.string().refine((value) => value !== DEFAULT, {
    message: VALIDATION[LOCATION_NAME],
  }),
  [ETC]: z.string().nullable(),
});

export type UserMetaSchema = z.infer<typeof userMetaFormSchema>;
