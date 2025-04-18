import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';

const { EXPERIENCE_NAME, REQUIRED_EUCATION_NAME, JOB_MID_CODE_NAME, LOCATION_NAME, ETC } = USER_META_DATA_KEY;

export type UserMetaDataType = {
  [EXPERIENCE_NAME]: string;
  [REQUIRED_EUCATION_NAME]: string;
  [JOB_MID_CODE_NAME]: string;
  [LOCATION_NAME]: string;
  [ETC]?: string | null;
};

export type RegionsType = {
  id: number;
  name: string;
  value: string;
};
