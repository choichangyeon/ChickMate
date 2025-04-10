'use client';

import { Session } from 'next-auth';
import { useCharacterStoreSync } from '@/features/chraracter/hooks/use-character-store-sync';
import { useGetCharacterQuery } from '@/features/chraracter/hooks/use-get-character-query';
import MainCharacterCard from './main-character-card';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';

type Props = {
  session: Session | null;
};

const { NEED_LOGIN, GET_DATA_LOADING, GET_DATA_NULL } = CHARACTER_MESSAGE.INFO;

const MainCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (!session) return <MainCharacterCard overlayText={NEED_LOGIN} />;

  if (isPending) return <MainCharacterCard overlayText={GET_DATA_LOADING} />;

  if (isError || !characterData) return <MainCharacterCard requiredModal overlayText={GET_DATA_NULL} />;

  if (characterData) return <MainCharacterCard characterData={characterData} />;
};

export default MainCharacter;
