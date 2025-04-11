import Image from 'next/image';
import CreateCharacterModal from './create-character-modal';
import { Character } from '@prisma/client';
import { getLevelAndPercentage } from './utils/get-level-and-percent';
import { useModalStore } from '@/store/use-modal-store';
import { defaultCharacter } from './data/character-data';
import CharacterExpBar from './character-exp-bar';
import { CHARACTER_INFOMATIONS } from '@/constants/character-constants';

type Props = {
  characterData?: Character;
  requiredModal?: boolean;
  overlayText?: string;
};

const MainCharacterCard = ({ characterData = defaultCharacter, overlayText, requiredModal = false }: Props) => {
  const { isModalOpen, toggleModal } = useModalStore();
  const isDefault = characterData === defaultCharacter;
  const { type, experience } = characterData;
  const { level, percent } = getLevelAndPercentage(experience);
  const characterName = CHARACTER_INFOMATIONS[type][level].name;

  return (
    <>
      <div
        onClick={() => {
          requiredModal && toggleModal();
        }}
        className='relative flex cursor-pointer flex-col overflow-hidden rounded-lg border-2 p-7 hover:shadow-lg'
      >
        {isDefault && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/30'>
            <span className='text-xl font-semibold text-black/70'>{overlayText}</span>
          </div>
        )}
        <div className={`${isDefault && 'pointer-events-none opacity-60'}`}>
          <div className='flex items-center gap-3 text-black/50'>
            <span className='text-2xl font-extrabold'>EXP</span>
            <div className='flex w-full justify-around'>
              <CharacterExpBar percent={percent} type='main' />
            </div>
          </div>
          <Image
            src={`/assets/character/card/${type}-level${level}.png`}
            width={344}
            height={344}
            alt='character-img'
            priority
          />
          <div className='flex justify-between gap-6'>
            <span className='text-[40px] font-extrabold text-red-500'>LV : {level}</span>
            <div className='flex items-center justify-center rounded-3xl border border-black px-9 py-3'>
              <span className='text-xl'>{characterName}</span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CreateCharacterModal />}
    </>
  );
};

export default MainCharacterCard;
