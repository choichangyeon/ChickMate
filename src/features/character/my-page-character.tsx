'use client';

import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';
import MyPageCharacterCard from '@/features/character/my-page-character-card';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

const { NEED_LOGIN, GET_DATA_LOADING, GET_DATA_NULL } = CHARACTER_MESSAGE.INFO;

const MyPageCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (!session) return <MyPageCharacterCard overlayText={NEED_LOGIN} />;

  if (isPending) return <MyPageCharacterCard overlayText={GET_DATA_LOADING} session={session} />;

  if (isError || !characterData)
    return <MyPageCharacterCard requiredModal overlayText={GET_DATA_NULL} session={session} />;

  if (characterData) return <MyPageCharacterCard characterData={characterData} session={session} />;
};

export default MyPageCharacter;
