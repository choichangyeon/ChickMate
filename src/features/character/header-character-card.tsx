'use client';

import Image from 'next/image';
import { Character } from '@prisma/client';
import { getLevelAndPercentage } from '@/features/character/utils/get-level-and-percent';
import { Session } from 'next-auth';
import { defaultCharacter } from './data/character-data';
import CreateCharacterModal from '@/features/character/create-character-modal';
import { useModalStore } from '@/store/use-modal-store';
import { CHARACTER_INFOMATIONS } from '@/constants/character-constants';
import Typography from '@/components/ui/typography';
import CharacterExpBar from '@/features/character/character-exp-bar';
import ScreenOverlay from '@/components/ui/screen-overlay';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path-constant';

type Props = {
  session?: Session;
  characterData?: Character;
  overlayText?: string;
  requiredModal?: boolean;
};

const { SIGN_IN } = PATH.AUTH;

const HeaderCharacterCard = ({
  session,
  characterData = defaultCharacter,
  overlayText,
  requiredModal = false,
}: Props) => {
  const router = useRouter();
  const { isModalOpen, toggleModal } = useModalStore();

  const isDefault = characterData === defaultCharacter && !!overlayText;
  const { level, percent } = getLevelAndPercentage(characterData.experience);
  const characterName = CHARACTER_INFOMATIONS[characterData.type][level].name;

  const handleClickCard = () => {
    if (!session) {
      router.push(SIGN_IN);
    } else if (requiredModal) {
      toggleModal();
    } else if (!isDefault) {
      // 캐릭터 상세 모달 toggle
    }
  };

  return (
    <>
      <div onClick={handleClickCard} className='relative flex cursor-pointer items-center gap-4 px-8'>
        {isDefault && <ScreenOverlay overlayText={overlayText} />}

        <div className={`${isDefault && 'opacity-60'} flex items-center gap-4`}>
          <div>
            <div className='flex flex-col'>
              <div className='flex w-56 items-center justify-between'>
                <Typography weight='bold' size='md'>
                  <span className='pr-2 text-primary-orange-600'>LV {level} </span>
                  {session && session.user.name}님
                </Typography>
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
            <div className='h-12 w-12 overflow-hidden rounded-full border'>
              <Image
                src={`/assets/character/header/level${level}.jpeg`}
                width={48}
                height={48}
                alt={characterName}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CreateCharacterModal />}
    </>
  );
};

export default HeaderCharacterCard;
