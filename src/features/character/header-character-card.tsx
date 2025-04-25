'use client';

import Image from 'next/image';
import { Session } from 'next-auth';
import Typography from '@/components/ui/typography';
import ScreenOverlay from '@/components/ui/screen-overlay';
import CharacterExpBar from '@/features/character/character-exp-bar';
import { defaultCharacter } from '@/features/character/data/character-data';
import CreateCharacterModal from '@/features/character/create-character-modal';
import { useCharacterCard } from '@/features/character/hooks/use-character-card';
import CharacterDetailModal from '@/features/character/character-detail-modal';
import type { CharacterType } from '@/types/DTO/character-dto';

type Props = {
  session?: Session;
  characterData?: CharacterType;
  overlayText?: string;
  requiredModal?: boolean;
};

const HeaderCharacterCard = ({
  session,
  characterData = defaultCharacter,
  overlayText,
  requiredModal = false,
}: Props) => {
  const { isCreateModalOpen, isDetailModalOpen, isDefault, level, type, percent, characterName, handleClickCard } =
    useCharacterCard({
      characterData,
      overlayText,
      requiredModal,
      session,
    });

  return (
    <>
      <div onClick={handleClickCard} className='relative flex cursor-pointer items-center gap-4 px-8'>
        {isDefault && (
          <ScreenOverlay>
            {session ? <Typography>캐릭터 선택하러 가기</Typography> : '이런! 로그인을 하지 않았어요!'}
          </ScreenOverlay>
        )}
        <div className={`${isDefault && 'opacity-60'} flex items-center gap-4`}>
          <div>
            <div className='flex flex-col'>
              <div className='flex w-56 items-center justify-between'>
                <div className='flex w-36 truncate'>
                  <Typography weight='bold' size='md'>
                    <span className='pr-2 text-primary-orange-600'>LV {level} </span>
                  </Typography>
                  <Typography weight='bold' size='md'>
                    {session && session.user.name}님
                  </Typography>
                </div>
                {/* 추후 tag 공통 컴포넌트 */}
                <div className='rounded-xl border p-1 text-center text-xs font-normal text-cool-gray-900'>
                  {characterName}
                </div>
              </div>
              <CharacterExpBar type='header' percent={percent} />
            </div>
          </div>
          <div>
            {/* 추후 원형 이미지로 대체 예정 */}
            <Image
              src={`/assets/character/header/${type}-level${level}.png`}
              width={48}
              height={48}
              alt={characterName}
              priority
            />
          </div>
        </div>
      </div>
      {isCreateModalOpen && <CreateCharacterModal />}
      {isDetailModalOpen && session && <CharacterDetailModal session={session} />}
    </>
  );
};

export default HeaderCharacterCard;
