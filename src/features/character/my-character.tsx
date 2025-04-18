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
  return (
    <>
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <Image
          src={`/assets/character/card/${type}-level${level}.png`}
          width={200}
          height={200}
          alt={characterName}
          priority
        />
        <div className='flex w-full items-center'>
          <div className='flex-1 border-t'></div>
        </div>
        <div className='flex w-full items-center gap-8'>
          <div className='flex w-full flex-col'>
            <div className='flex items-center w-full justify-between gap-6'>
              <div className='flex items-center justify-center gap-3'>
                <Typography weight='black' size='xl' color='primary-600'>
                  LV {level}
                </Typography>
                <div className='line-clamp-1 w-[72px]'>
                  <Typography weight='bold'>{session && session.user.name}님</Typography>
                </div>
              </div>
              <Typography weight='normal'>{characterName}</Typography>
            </div>
            <CharacterExpBar type='main' percent={percent} />
            <div className='text-secondary-yellow'>
              <Typography weight='normal' color='gray-500' size='xs' align='center'>
                앞으로 {remainingExp} 경험치만 더 쌓으면 레벨이 올라요!
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCharacter;
