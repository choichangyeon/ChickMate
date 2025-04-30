'use client';

import { Session } from 'next-auth';
import { useState } from 'react';
import Modal from '@/components/ui/modal';
import Typography from '@/components/ui/typography';
import LoadingAnimation from '@/components/common/loading-animation';
import ErrorComponent from '@/components/common/error-component';
import { MODAL_ID } from '@/constants/modal-id-constants';
import MyCharacter from '@/features/character/my-character';
import CharacterHistoryList from '@/features/character/character-history';
import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';

type Props = {
  session: Session;
};

type Tab = 'info' | 'history';

const CharacterDetailModal = ({ session }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('info');
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (isPending) {
    return (
      <div className='flex w-full items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <Modal modalId={MODAL_ID.CHARACTER_DETAIL}>
      <div className='mb-4 flex justify-around'>
        <button
          aria-label='My mate 탭으로 전환'
          onClick={() => setSelectedTab('info')}
          className={`cursor-pointer px-4 py-2 ${
            selectedTab === 'info' ? 'border-b-2 border-primary-orange-600 font-bold' : 'text-cool-gray-500'
          }`}
        >
          <Typography
            color={selectedTab === 'info' ? 'primary-600' : 'gray-500'}
            className='text-2xl font-bold mobile:text-lg'
          >
            My Mate
          </Typography>
        </button>
        <button
          aria-label='history 탭으로 전환'
          onClick={() => setSelectedTab('history')}
          className={`cursor-pointer px-4 py-2 ${
            selectedTab === 'history'
              ? 'border-b-2 border-primary-orange-600 font-bold text-primary-orange-600'
              : 'text-cool-gray-500'
          }`}
        >
          <Typography
            className='text-2xl font-bold mobile:text-lg'
            color={selectedTab === 'history' ? 'primary-600' : 'gray-500'}
          >
            History
          </Typography>
        </button>
      </div>
      {selectedTab === 'info' && !!characterData ? (
        <MyCharacter session={session} characterData={characterData} />
      ) : (
        <CharacterHistoryList characterData={characterData} />
      )}
    </Modal>
  );
};

export default CharacterDetailModal;
