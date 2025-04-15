'use client';

import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/store/use-modal-store';
import Image from 'next/image';
import { postCreateCharacter } from '@/features/character/api/client-services';
import { CHARACTER_INFOMATIONS } from '@/constants/character-constants';
import { CHARACTER_MESSAGE } from '@/constants/message-constants';
import { MODAL_ID } from '@/constants/modal-id-constants';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';

const { CHARACTER } = QUERY_KEY;
const { POST_DATA_SUCCESS } = CHARACTER_MESSAGE.POST;
const { CHARACTER_CREATE } = MODAL_ID;

const CreateCharacterModal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const queryClient = useQueryClient();

  const characterTypes = Object.keys(CHARACTER_INFOMATIONS);
  const type = characterTypes[currentIndex];
  const selectedCharacter = CHARACTER_INFOMATIONS[type][1];

  const toggleModal = useModalStore((state) => state.toggleModal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postCreateCharacter({ type });
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
        className='mx-auto flex w-full max-w-xl flex-col items-center justify-center bg-white p-6'
      >
        <h2 className='mb-6 text-center text-3xl font-bold text-gray-800'>캐릭터 선택</h2>

        <div className='mb-6 flex w-full flex-col items-center'>
          <div className='flex w-full items-center justify-between'>
            <button
              type='button'
              onClick={goToPrev}
              disabled={characterTypes.length <= 1}
              className='text-3xl text-gray-500 transition'
              aria-label='이전 캐릭터 보기'
            >
              &lt;
            </button>
            <Image
              src={`/assets/character/card/${type}-level1.png`}
              alt={selectedCharacter.name}
              width={220}
              height={220}
            />
            <button
              type='button'
              onClick={goToNext}
              disabled={characterTypes.length <= 1}
              className='text-3xl text-gray-500 transition'
              aria-label='다음 캐릭터 보기'
            >
              &gt;
            </button>
          </div>
          <span className='mt-3 text-xl font-semibold text-gray-700'>{selectedCharacter.name}</span>
        </div>

        <button
          type='submit'
          className='rounded-md bg-green-500 px-6 py-3 text-lg font-semibold text-white transition hover:bg-green-600 disabled:opacity-50'
        >
          캐릭터 생성
        </button>
      </form>
    </Modal>
  );
};

export default CreateCharacterModal;
