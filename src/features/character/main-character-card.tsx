'use client';

import Image from 'next/image';
import { Character } from '@prisma/client';
import { defaultCharacter } from '@/features/character/data/character-data';
import CharacterExpBar from '@/features/character/character-exp-bar';
import Typography from '@/components/ui/typography';
import { Session } from 'next-auth';
import ScreenOverlay from '@/components/ui/screen-overlay';
import { useCharacterCard } from './hooks/use-character-card';
import CharacterDetailModal from './character-detail-modal';
import CreateCharacterModal from './create-character-modal';

type Props = {
  characterData?: Character;
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
        className='relative flex h-96 min-w-72 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border-2 p-8'
      >
        {isDefault && <ScreenOverlay overlayText={overlayText!} />}
        <div className={`${isDefault && 'opacity-60'} flex h-full flex-col justify-between`}>
          {/* 추후 이미지로 대체 예정 div wrapper 필요 없음 */}
          <div className='min-w-60'>
            <Image
              src={`/assets/character/card/${type}-level${level}.png`}
              width={240}
              height={240}
              alt='character-img'
              priority
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between gap-6'>
              <Typography weight='black' color='primary-600'>
                LV {level}
              </Typography>
              <Typography size='sm'>{characterName}</Typography>
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
