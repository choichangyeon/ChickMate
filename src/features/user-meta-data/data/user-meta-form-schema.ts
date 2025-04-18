import { USER_META_DATA_FORM_MESSAGE } from '@/constants/message-constants';
import { DEFAULT, USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';
import { z } from 'zod';
const { EXPERIENCE_NAME, REQUIRED_EUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;
const { VALIDATION } = USER_META_DATA_FORM_MESSAGE;

/**
 * user metadata form의 validation schema
 */
export const userMetaFormSchema = z.object({
  [EXPERIENCE_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[EXPERIENCE_NAME]),
  // career: z.string(), => 경력기간 :  사람인 api 연결 시 사용
  [REQUIRED_EUCATION_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[REQUIRED_EUCATION_NAME]),
  [JOB_MID_CODE_NAME]: z.string().refine((value) => value !== DEFAULT, VALIDATION[JOB_MID_CODE_NAME]),
  [LOCATION_NAME]: z.string().refine((value) => value !== DEFAULT, {
    message: VALIDATION[LOCATION_NAME],
  }), // => 사람인 api 연결 시 삭제
  // mainRegion: z.string().refine((value) => value !== DEFAULT, {
  //   message: '지역을 선택해 주세요.',
  // }),
  // subRegion: z.string(),

  [ETC]: z.string().nullable(),
});
// .superRefine((values, ctx) => {
//   const { type, mainRegion, subRegion, career } = values;
//   if (type === 'experienced' && career === DEFAULT) {
//     ctx.addIssue({
//       path: ['career'],
//       code: z.ZodIssueCode.custom,
//       message: '세부 경력을 선택해 주세요.',
//     });
//   }

//   if (mainRegion !== DEFAULT && subRegion === DEFAULT) {
//     ctx.addIssue({
//       path: ['subRegion'],
//       code: z.ZodIssueCode.custom,
//       message: '지역을 자세히 선택해 주세요.',
//     });
//   }
// }); // => 사람인 api 연결 시 사용

export type UserMetaSchema = z.infer<typeof userMetaFormSchema>;
