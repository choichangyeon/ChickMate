'use client';

import Image from 'next/image';
import { Session } from 'next-auth';
import Typography from '@/components/ui/typography';
import ScreenOverlay from '@/components/ui/screen-overlay';
import BlockComponent from '@/components/common/block-component';
import CharacterExpBar from '@/features/character/character-exp-bar';
import { defaultCharacter } from '@/features/character/data/character-data';
import { useCharacterCard } from '@/features/character/hooks/use-character-card';
import CharacterDetailModal from '@/features/character/character-detail-modal';
import CreateCharacterModal from '@/features/character/create-character-modal';
import type { CharacterType } from '@/types/DTO/character-dto';

type Props = {
  characterData?: CharacterType;
  requiredModal?: boolean;
  overlayText?: string;
  session?: Session;
};

const MainCharacterCard = ({
  characterData = defaultCharacter,
  requiredModal = false,
  overlayText,
  session,
}: Props) => {
  const { isCreateModalOpen, isDetailModalOpen, isDefault, type, level, percent, characterName, handleClickCard } =
    useCharacterCard({
      characterData,
      overlayText,
      requiredModal,
      session,
    });

  return (
    <>
      <div
        onClick={handleClickCard}
        className='relative flex h-full min-w-72 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border-2 p-8'
      >
        {isDefault && (
          <ScreenOverlay>
            <BlockComponent
              firstLine={session ? '이런! 내 캐릭터가 없어요!' : '이런! 로그인을 하지 않았어요!'}
              secondLine={session ? '캐릭터를 설정해볼까요?' : '로그인이 필요합니다!'}
              thirdLine={session ? 'ChickMate를 설정하고 함께 성장해요' : ''}
              buttonName={session ? '캐릭터 선택하기' : '로그인하러 가기'}
              href={session ? undefined : '/sign-in'}
            />
          </ScreenOverlay>
        )}
        <div className={`${isDefault && 'opacity-60'} flex h-full flex-col justify-between`}>
          <Image
            src={`/assets/character/card/${type}-level${level}.png`}
            width={242}
            height={242}
            alt='character-img'
            priority
          />
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between gap-6'>
              <Typography size='2xl' weight='black' color='primary-600'>
                LV {level}
              </Typography>
              <Typography size='xl' weight='bold'>
                {characterName}
              </Typography>
            </div>
            <CharacterExpBar type='main' percent={percent} />
          </div>
        </div>
      </div>

      {isCreateModalOpen && <CreateCharacterModal />}
      {isDetailModalOpen && session && <CharacterDetailModal session={session} />}
    </>
  );
};

export default MainCharacterCard;
