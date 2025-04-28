import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';

const { EXPERIENCE_NAME, REQUIRED_EDUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;

export type UserMetaDataType = {
  [EXPERIENCE_NAME]: string;
  [REQUIRED_EDUCATION_NAME]: string;
  [JOB_MID_CODE_NAME]: string;
  [LOCATION_NAME]: string;
  [ETC]?: string | null;
};

type Regions =
  | '서울'
  | '경기'
  | '인천'
  | '부산'
  | '대구'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '강원'
  | '경남'
  | '경북'
  | '전남'
  | '전북'
  | '충남'
  | '충북'
  | '제주';

export type RegionsType = {
  name: Regions;
  value: Regions;
};
