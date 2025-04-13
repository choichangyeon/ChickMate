'use client';

import Modal from '@/components/ui/modal';
import MyCharacter from './my-character';
import { Session } from 'next-auth';
import { useGetCharacterQuery } from './hooks/use-get-character-query';
import { useCharacterStoreSync } from './hooks/use-character-store-sync';
import { useState } from 'react';
import { MODAL_ID } from '@/constants/modal-id-constants';

type Props = {
  session: Session;
};

type Tab = 'info' | 'history';

const CharacterDetailModal = ({ session }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('info');
  const { data: characterData } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  return (
    <Modal modalId={MODAL_ID.CHARACTER_DETAIL}>
      <div className='flex justify-around border-gray-300'>
        <div
          onClick={() => setSelectedTab('info')}
          className={`cursor-pointer px-4 py-2 ${
            selectedTab === 'info' ? 'border-b-2 border-black font-bold' : 'text-gray-500'
          }`}
        >
          내 캐릭터
        </div>
        <div
          onClick={() => setSelectedTab('history')}
          className={`cursor-pointer px-4 py-2 ${
            selectedTab === 'history' ? 'border-b-2 border-black font-bold' : 'text-gray-500'
          }`}
        >
          성장 히스토리
        </div>
      </div>
      {selectedTab === 'info' ? <MyCharacter session={session} characterData={characterData} /> : null}
    </Modal>
  );
};

export default CharacterDetailModal;
