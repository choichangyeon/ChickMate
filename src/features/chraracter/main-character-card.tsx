import Image from 'next/image';

type Props = {
  level: number;
  percent: number;
  name: string;
  disabled?: boolean;
  overlayText?: string;
  onClick?: () => void;
};

const MainCharacterCard = ({ level, percent, name, disabled = false, overlayText, onClick }: Props) => {
  return (
    // 추후 캐릭터 modal 만들어질 시 onClick 조건부 삭제
    <div
      onClick={onClick}
      className={`relative flex flex-col overflow-hidden rounded-lg border-2 p-7 ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      }`}
    >
      {disabled && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/30'>
          <span className='text-xl font-semibold text-black/70'>{overlayText}</span>
        </div>
      )}

      <div className={`${disabled ? 'pointer-events-none opacity-60' : ''}`}>
        <div className='flex items-center gap-3 text-black/50'>
          <span className='text-2xl font-extrabold'>EXP</span>
          <div className='flex w-full justify-around'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-[6px] w-5 rounded-sm ${i < Math.floor(percent / 10) ? 'bg-green-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <Image
          src={`/assets/character/card/level${level}.png`}
          width={344}
          height={344}
          alt='character-img'
          className='mx-auto'
        />

        <div className='flex justify-between gap-6'>
          <span className='text-[40px] font-extrabold text-red-500'>LV : {level}</span>
          <div className='flex items-center justify-center rounded-3xl border border-black px-9 py-3'>
            <span className='text-xl'>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCharacterCard;
