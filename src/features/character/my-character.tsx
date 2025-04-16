'use client';

import Image from 'next/image';
import { Character } from '@prisma/client';
import { Session } from 'next-auth';
import { defaultCharacter } from '@/features/character/data/character-data';
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
  const { type, level, remainingExp, percent, characterName } = useCharacterCard({
    characterData,
    overlayText,
    requiredModal,
    session,
  });
  // 글씨 크기 한 사이즈씩 줄인 상태
  return (
    <>
      <div className='relative flex items-center gap-4 px-8'>
        <div className='flex items-center gap-4'>
          <div>
            <div className='flex flex-col items-center justify-center'>
              {/* 추후 크기 변경 필요 */}
              <div className='py-4'>
                <Image
                  src={`/assets/character/card/${type}-level${level}.png`}
                  width={200}
                  height={200}
                  alt={characterName}
                  priority
                />
              </div>
              <div className='flex items-center gap-8'>
                <div className='flex flex-col'>
                  <div className='flex items-center justify-between gap-6'>
                    <div className='flex items-center justify-center gap-3'>
                      <Typography weight='black' size='xl' color='primary-600'>
                        LV {level}
                      </Typography>
                      <div className='w-[72px] line-clamp-1'>
                        <Typography weight='bold' size='xl'>
                          {session && session.user.name}님
                        </Typography>
                      </div>
                    </div>
                    <div className='text-secondary-yellow'>
                      <Typography weight='bold' color='secondary-yellow' size='sm'>
                        {remainingExp} 경험치만 더 쌓으면
                      </Typography>
                      <Typography weight='bold' color='secondary-yellow' size='sm' align='right'>
                        레벨이 올라요!
                      </Typography>
                    </div>
                  </div>
                  <CharacterExpBar type='main' percent={percent} />
                </div>
                {/* 추후 tag 공통 컴포넌트 */}
                <div className='rounded-3xl border border-black px-10 py-1 text-center font-normal text-cool-gray-900'>
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
