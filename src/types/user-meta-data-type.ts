import { USER_META_DATA_KEY } from '@/constants/user-meta-data-constants';

const { TYPE, EDUCATION, JOB, MAIN_REGION, ETC } = USER_META_DATA_KEY;
export type UserMetaDataType = {
  [TYPE]: string;
  // career: string; => 사람인 api 연결 시 사용
  [EDUCATION]: string;
  [JOB]: string;
  [MAIN_REGION]: string; // => 사람인 api 연결 시 삭제
  // mainRegion: string; => 사람인 api 연결 시 사용
  // subRegion: string; => 사람인 api 연결 시 사용
  [ETC]?: string | null;
};

// export type DependencyMap = {
//   [K in keyof UserMetaDataType]?: {
//     children: (keyof UserMetaDataType)[];
//     condition: (value: UserMetaDataType[K]) => boolean;
//   };
// }; => 사람인 api 연결되면 살릴 예정

export type RegionsType = {
  id: number;
  name: string;
  value: string;
};
