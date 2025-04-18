'use client';

import { Session } from 'next-auth';
import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';
import MainCharacterCard from '@/features/character/main-character-card';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';

type Props = {
  session: Session | null;
};

const { NEED_LOGIN, GET_DATA_LOADING, GET_DATA_NULL } = CHARACTER_MESSAGE.INFO;

const MainCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (!session) return <MainCharacterCard overlayText={NEED_LOGIN} />;

  if (isPending) return <MainCharacterCard overlayText={GET_DATA_LOADING} session={session} />;

  if (isError || !characterData)
    return <MainCharacterCard requiredModal overlayText={GET_DATA_NULL} session={session} />;

  if (characterData) return <MainCharacterCard characterData={characterData} session={session} />;
};

export default MainCharacter;
