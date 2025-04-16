'use client';

import Modal from '@/components/ui/modal';
import MyCharacter from '@/features/character/my-character';
import { Session } from 'next-auth';
import { useGetCharacterQuery } from '@/features/character/hooks/use-get-character-query';
import { useCharacterStoreSync } from '@/features/character/hooks/use-character-store-sync';
import { useState } from 'react';
import { MODAL_ID } from '@/constants/modal-id-constants';
import CharacterHistoryList from '@/features/character/character-history';

type Props = {
  session: Session;
};

type Tab = 'info' | 'history';

const CharacterDetailModal = ({ session }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>('info');
  const { data: characterData, isPending, isError } = useGetCharacterQuery();

  useCharacterStoreSync(characterData);

  if (isPending) {
    return <div>캐릭터 정보를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div>캐릭터 정보를 불러올 수 없습니다...</div>;
  }

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
        {selectedTab === 'info' && !!characterData ? (
          <MyCharacter session={session} characterData={characterData} />
        ) : (
          <CharacterHistoryList characterData={characterData} />
        )}
    </Modal>
  );
};

export default CharacterDetailModal;
