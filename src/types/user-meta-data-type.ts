export type UserMetaDataType = {
  type: string;
  career: string;
  academic: string;
  job: string;
  mainRegion: string;
  subRegion: string;
  etc?: string | null;
};

export type DependencyMap = {
  [K in keyof UserMetaDataType]?: {
    children: (keyof UserMetaDataType)[];
    condition: (value: UserMetaDataType[K]) => boolean;
  };
};
