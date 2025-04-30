'use client';

import { Session } from 'next-auth';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';
import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import HeaderCharacterCard from '@/features/character/header-character-card';

type Props = {
  session: Session | null;
};

const { NEED_LOGIN, GET_DATA_LOADING, GET_DATA_NULL } = CHARACTER_MESSAGE.INFO;

const HeaderCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (!session) return <HeaderCharacterCard overlayText={NEED_LOGIN} />;

  if (isPending) return <HeaderCharacterCard session={session} overlayText={GET_DATA_LOADING} />;

  if (isError || !characterData)
    return <HeaderCharacterCard session={session} requiredModal overlayText={GET_DATA_NULL} />;

  return <HeaderCharacterCard session={session} characterData={characterData} />;
};

export default HeaderCharacter;
