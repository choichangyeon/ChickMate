'use client';

import Image from 'next/image';
import { Session } from 'next-auth';
import Typography from '@/components/ui/typography';
import { defaultCharacter } from '@/features/character/data/character-data';
import CharacterExpBar from '@/features/character/character-exp-bar';
import { useCharacterCard } from '@/features/character/hooks/use-character-card';
import type { CharacterType } from '@/types/DTO/character-dto';

type Props = {
  session?: Session;
  characterData?: CharacterType;
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
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <div className='flex h-[226px] w-full items-center justify-center bg-[url("/assets/visual_assets.png")] bg-cover'>
        <Image
          src={`/assets/character/card/${type}-level${level}.png`}
          width={226}
          height={226}
          alt={characterName}
          priority
        />
      </div>

      <hr className='w-full border border-cool-gray-100' />

      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Typography size='2xl' color='primary-600' weight='black'>
              LV {level}
            </Typography>
            <div className='max-w-56 truncate'>
              <Typography weight='bold'>{session?.user.name ?? '칰칰이'}님</Typography>
            </div>
          </div>
          <Typography weight='normal'>{characterName}</Typography>
        </div>
        <div>
          <CharacterExpBar type='main' percent={percent} />
          <Typography weight='normal' color='gray-500' size='xs' align='center'>
            앞으로 {remainingExp} 경험치만 더 쌓으면 레벨이 올라요!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MyCharacter;
