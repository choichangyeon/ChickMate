'use client';
import { Session } from 'next-auth';
import Image from 'next/image';
import { defaultCharacter } from '@/features/character/data/character-data';
import CharacterExpBar from '@/features/character/character-exp-bar';
import Typography from '@/components/ui/typography';
import ScreenOverlay from '@/components/ui/screen-overlay';
import { useCharacterCard } from '@/features/character/hooks/use-character-card';
import CharacterDetailModal from '@/features/character/character-detail-modal';
import CreateCharacterModal from '@/features/character/create-character-modal';
import type { CharacterType } from '@/types/DTO/character-dto';
import BlockComponent from '@/components/common/block-component';

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
      <button
        onClick={handleClickCard}
        className='tablet:min-w-50 relative flex h-full min-w-72 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border p-8 mobile:w-1/3 mobile:p-2'
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
        <div
          className={`${isDefault && 'opacity-60'} flex h-full flex-col justify-between mobile:flex-row mobile:justify-start mobile:p-2`}
        >
          <div className='mobile:w-28'>
            <Image
              src={`/assets/character/card/${type}-level${level}.png`}
              width={242}
              height={242}
              alt='character-img'
              priority
            />
          </div>
          <div className='flex flex-col gap-2 mobile:justify-center'>
            <div className='flex justify-between gap-6 mobile:flex-col mobile:gap-3'>
              <Typography as='span' className='mobile:xl wxl font-black text-primary-orange-600'>
                LV {level}
              </Typography>
              <Typography as='span' className='mobile:lg xl font-bold'>
                {characterName}
              </Typography>
            </div>
            <CharacterExpBar type='main' percent={percent} />
          </div>
        </div>
      </button>

      {isCreateModalOpen && <CreateCharacterModal />}
      {isDetailModalOpen && session && <CharacterDetailModal session={session} />}
    </>
  );
};

export default MainCharacterCard;
