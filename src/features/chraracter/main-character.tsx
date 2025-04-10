'use client';

import { useGetCharacterQuery } from '@/features/chraracter/hooks/use-get-character-query';
import { useCharacterStore } from '@/store/use-character-store';
import { useEffect } from 'react';
import MainCharacterCard from './main-character-card';
import { Session } from 'next-auth';
import { useCharacterStoreSync } from './hooks/use-character-store-sync';

type Props = {
  session: Session | null;
};

const MainCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (!session) return <MainCharacterCard disabled overlayText='로그인이 필요합니다.' />;

  if (isError || (!isPending && !characterData))
    return <MainCharacterCard disabled requiredModal overlayText='캐릭터를 생성해주세요.' />;

  if (isPending) {
    <MainCharacterCard disabled overlayText='캐릭터 정보를 불러오는 중입니다.' />;
  }

  if (characterData) {
    return <MainCharacterCard characterData={characterData} />;
  }
};

export default MainCharacter;
