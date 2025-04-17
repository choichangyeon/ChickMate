'use client';

import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/store/use-modal-store';
import Image from 'next/image';
import { postCreateCharacter } from '@/features/character/api/client-services';
import { CHARACTER_HISTORY_KEY, CHARACTER_INFORMATION } from '@/constants/character-constants';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';
import RightArrowIcon from '@/components/icons/right-arrow-icon';
import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import { useExperienceUp } from './hooks/use-experience-up';
import { useCharacterStore } from '@/store/use-character-store';

const { CHARACTER } = QUERY_KEY;
const { POST_DATA_SUCCESS } = CHARACTER_MESSAGE.POST;
const { CHARACTER_CREATE } = MODAL_ID;
const { CREATE_CHARACTER } = CHARACTER_HISTORY_KEY;
const CreateCharacterModal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const queryClient = useQueryClient();

  const characterTypes = Object.keys(CHARACTER_INFORMATION);
  const type = characterTypes[currentIndex];
  const selectedCharacter = CHARACTER_INFORMATION[type][1];
  const { handleExperienceUp } = useExperienceUp();
  const setCharacterId = useCharacterStore((state) => state.setCharacterId);
  const toggleModal = useModalStore((state) => state.toggleModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await postCreateCharacter({ type });
      const characterId = res.id ?? null;
      setCharacterId(characterId);
      handleExperienceUp(CREATE_CHARACTER);
      queryClient.invalidateQueries({ queryKey: [CHARACTER] });
      alert(POST_DATA_SUCCESS);
      toggleModal(CHARACTER_CREATE);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + characterTypes.length) % characterTypes.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characterTypes.length);
  };

  return (
    <Modal modalId={CHARACTER_CREATE}>
      <form
        onSubmit={handleSubmit}
        className='mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 bg-white'
      >
        <Typography size='2xl'>
          <span className='text-primary-orange-600'>ChickMate</span>를 선택하세요!
        </Typography>

        <div className='flex w-full flex-col items-center'>
          <div className='flex w-full items-center justify-center gap-8'>
            <button
              type='button'
              onClick={goToPrev}
              disabled={characterTypes.length <= 1}
              className='text-3xl text-gray-500 transition'
              aria-label='이전 캐릭터 보기'
            >
              <LeftArrowIcon />
            </button>
            <Image
              src={`/assets/character/card/${type}-level1.png`}
              alt={selectedCharacter.name}
              width={200}
              height={200}
            />
            <button
              type='button'
              onClick={goToNext}
              disabled={characterTypes.length <= 1}
              className='text-3xl text-gray-500 transition'
              aria-label='다음 캐릭터 보기'
            >
              <RightArrowIcon />
            </button>
          </div>
        </div>
        <div className='flex w-full items-center'>
          <div className='flex-1 border-t'></div>
        </div>
        <div className='flex w-full items-end justify-between'>
          <div>
            <Typography weight='bold'>ChickMate</Typography>
            <Typography weight='bold' color='primary-600' size='2xl'>
              {selectedCharacter.name}
            </Typography>
          </div>
          <Button type='submit' size='small' square variant='outline'>
            캐릭터 생성
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCharacterModal;
