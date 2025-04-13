'use client';

import Image from 'next/image';
import CreateCharacterModal from '@/features/character/create-character-modal';
import { Character } from '@prisma/client';
import { defaultCharacter } from '@/features/character/data/character-data';
import CharacterExpBar from '@/features/character/character-exp-bar';
import Typography from '@/components/ui/typography';
import { Session } from 'next-auth';
import ScreenOverlay from '@/components/ui/screen-overlay';
import { useCharacterCard } from './hooks/use-character-card';

type Props = {
  characterData?: Character;
  requiredModal?: boolean;
  overlayText?: string;
  session?: Session;
};

const MainCharacterCard = ({ characterData = defaultCharacter, overlayText, requiredModal = false }: Props) => {
  const { isModalOpen, isDefault, type, level, percent, characterName, handleClickCard } = useCharacterCard({
    characterData,
    overlayText,
    requiredModal,
  });

  return (
    <>
      <div
        onClick={handleClickCard}
        className='relative flex cursor-pointer flex-col overflow-hidden rounded-lg border-2 p-7 hover:shadow-lg'
      >
        {isDefault && <ScreenOverlay overlayText={overlayText!} />}
        <div className={`${isDefault && 'opacity-60'}`}>
          {/* 추후 이미지로 대체 예정 div wrapper 필요 없음 */}
          <div className='py-16'>
            <Image
              src={`/assets/character/card/${type}-level${level}.png`}
              width={240}
              height={362}
              alt='character-img'
              priority
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between gap-6'>
              <Typography weight='black' size='2xl' color='primary-600'>
                LV {level}
              </Typography>
              <Typography weight='bold' size='xl'>
                {characterName}
              </Typography>
            </div>
            <CharacterExpBar type='main' percent={percent} />
          </div>
        </div>
      </div>
      <CreateCharacterModal />
    </>
  );
};

export default MainCharacterCard;
