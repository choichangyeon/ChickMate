'use client';

import Image from 'next/image';
import { Character } from '@prisma/client';
import { defaultCharacter } from '@/features/character/data/character-data';
import Typography from '@/components/ui/typography';
import { Session } from 'next-auth';
import ScreenOverlay from '@/components/ui/screen-overlay';
import { useCharacterCard } from '@/features/character/hooks/use-character-card';
import CharacterDetailModal from '@/features/character/character-detail-modal';
import CreateCharacterModal from '@/features/character/create-character-modal';
import BlockComponent from '@/components/common/block-component';

type Props = {
  characterData?: Character;
  requiredModal?: boolean;
  overlayText?: string;
  session?: Session;
};

const MyPageCharacterCard = ({
  characterData = defaultCharacter,
  requiredModal = false,
  overlayText,
  session,
}: Props) => {
  const { isCreateModalOpen, isDetailModalOpen, isDefault, type, level, characterName, handleClickCard } =
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
        className='relative flex h-full w-[524px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border-2 shadow-lg'
      >
        {isDefault && (
          <ScreenOverlay>
            <BlockComponent
              firstLine={session ? '이런! 내 캐릭터가 없어요!' : '이런! 로그인을 하지 않았어요!'}
              secondLine={session ? '캐릭터를 설정해볼까요?' : '로그인이 필요합니다!'}
              thirdLine={session ? 'ChickNate를 설정하고 함께 성장해요' : ''}
              buttonName={session ? '캐릭터 선택하기' : '로그인하러 가기'}
              href={session ? undefined : '/sign-in'}
            />
          </ScreenOverlay>
        )}
        <div className={`flex h-full justify-between ${isDefault && 'opacity-60'}`}>
          <div className='flex items-center justify-center'>
            <Image
              src={`/assets/character/card/${type}-level${level}.png`}
              width={242}
              height={242}
              alt='character-img'
              priority
            />
          </div>

          {/* 텍스트와 기타 콘텐츠는 padding 적용 */}
          <div className='flex flex-1 flex-col justify-between py-6 pr-9'>
            <Typography size='sm' align='right'>
              ChickMate
            </Typography>
            <div className='flex flex-col gap-1'>
              <Typography size='3xl' weight='bold'>
                {session?.user.name}
              </Typography>
              <Typography size='xs' color='gray-500'>
                {characterName}
              </Typography>
            </div>
            <div className='flex justify-end'>
              <img src='/assets/character/card/card_assets.svg' alt='card-assets' className='w-[175px]' />
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && <CreateCharacterModal />}
      {isDetailModalOpen && session && <CharacterDetailModal session={session} />}
    </>
  );
};

export default MyPageCharacterCard;
