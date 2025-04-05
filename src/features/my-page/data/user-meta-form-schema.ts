import { DEFAULT } from '@/constants/user-meta-data-constants';
import { z } from 'zod';

export const userMetaFormSchema = z
  .object({
    type: z.string().refine((value) => value !== DEFAULT, '경력을 선택해 주세요.'),
    career: z.string(),
    academic: z.string().refine((value) => value !== DEFAULT, '학력을 선택해 주세요.'),
    job: z.string().refine((value) => value !== DEFAULT, '직종을 선택해 주세요.'),
    mainRegion: z.string().refine((value) => value !== DEFAULT, {
      message: '지역을 선택해 주세요.',
    }),
    subRegion: z.string(),
    etc: z.string().nullable(),
  })
  .superRefine((values, ctx) => {
    const { type, mainRegion, subRegion, career } = values;
    if (type === 'experienced' && career === DEFAULT) {
      ctx.addIssue({
        path: ['career'],
        code: z.ZodIssueCode.custom,
        message: '세부 경력을 선택해 주세요.',
      });
    }

    if (mainRegion !== DEFAULT && subRegion === DEFAULT) {
      ctx.addIssue({
        path: ['subRegion'],
        code: z.ZodIssueCode.custom,
        message: '지역을 자세히 선택해 주세요.',
      });
    }
  });
