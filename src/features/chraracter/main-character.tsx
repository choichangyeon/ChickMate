'use client';

import { useGetCharacterQuery } from '@/features/chraracter/hooks/use-get-character-query';
import { useCharacterStore } from '@/store/use-character-store';
import { getLevelAndPercentage } from '@/features/chraracter/utils/get-level-and-percent';
import { useEffect } from 'react';
import MainCharacterCard from './main-character-card';
import { PATH } from '@/constants/path-constant';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

const { SIGN_IN } = PATH.AUTH;

const MainCharacter = ({ session }: Props) => {
  const { data: characterData, isPending, isError } = useGetCharacterQuery();
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);
  const router = useRouter();

  useEffect(() => {
    if (characterData) {
      setCharacterId(characterData.id);
    }
  }, [characterData, setCharacterId]);

  if (!session)
    return (
      <MainCharacterCard
        level={4}
        percent={100}
        name='ChickMate'
        disabled
        overlayText='로그인이 필요합니다.'
        onClick={() => router.push(SIGN_IN)}
      />
    );

  // 세션은 있는데 캐릭터가 없음 → 캐릭터 생성 유도
  if (isError || (!isPending && !characterData))
    return (
      <MainCharacterCard
        level={4}
        percent={0}
        name='ChickMate'
        disabled
        overlayText='캐릭터를 생성해주세요.'
        // onClick={() => router.push()}
      />
    );

  if (isPending) {
    <MainCharacterCard
      level={4}
      percent={0}
      name='ChickMate'
      disabled
      overlayText='캐릭터 정보를 불러오는 중입니다.'
      // onClick={() => router.push(CHARACTER_CREATE)}
    />;
  }

  // 캐릭터 있음 → 정상 출력
  if (characterData) {
    const { level, percent } = getLevelAndPercentage(characterData.experience);
    return (
      <MainCharacterCard
        level={level}
        percent={percent}
        name='똑똑한 병아리'
        onClick={() => {
          // 캐릭터 상세 or 모달로 연결 가능
        }}
      />
    );
  }
};

export default MainCharacter;
