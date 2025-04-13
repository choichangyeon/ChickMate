'use client';

import Image from 'next/image';
import { Character } from '@prisma/client';
import { Session } from 'next-auth';
import { defaultCharacter } from './data/character-data';
import Typography from '@/components/ui/typography';
import CharacterExpBar from '@/features/character/character-exp-bar';
import { useCharacterCard } from './hooks/use-character-card';

type Props = {
  session?: Session;
  characterData?: Character;
  overlayText?: string;
  requiredModal?: boolean;
};

const MyCharacter = ({ session, characterData = defaultCharacter, overlayText, requiredModal = false }: Props) => {
  const { type, level, remainingExp, percent, characterName, handleClickCard } = useCharacterCard({
    characterData,
    overlayText,
    requiredModal,
    session,
  });

  return (
    <>
      <div onClick={handleClickCard} className='relative flex items-center gap-4 px-8'>
        <div className='flex items-center gap-4'>
          <div>
            <div className='flex flex-col items-center justify-center'>
              {/* 추후 이미지 변경 */}
              <Image
                src={`/assets/character/card/${type}-level${level}.png`}
                width={300}
                height={300}
                alt={characterName}
                priority
              />
              <div className='flex items-center gap-8'>
                <div className='flex flex-col'>
                  <div className='flex w-96 items-center justify-between'>
                    <div className='flex items-center justify-center gap-3'>
                      <Typography weight='black' size='2xl' color='primary-600'>
                        LV {level}
                      </Typography>
                      <Typography weight='bold' size='2xl'>
                        {session && session.user.name}님
                      </Typography>
                    </div>
                    <div className='text-secondary-yellow'>
                      <Typography weight='bold' color='secondary-yellow'>{remainingExp} 경험치만 더 쌓으면</Typography>
                      <Typography weight='bold' color='secondary-yellow'>레벨이 올라요!</Typography>
                    </div>
                  </div>
                  <CharacterExpBar type='main' percent={percent} />
                </div>
                {/* 추후 tag 공통 컴포넌트 */}
                <div className='rounded-3xl border border-black px-10 py-2 text-center text-2xl font-normal text-cool-gray-900'>
                  {characterName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCharacter;
