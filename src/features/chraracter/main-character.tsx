import Image from 'next/image';

const MainCharacter = () => {
  return (
    <div className='flex flex-col rounded-lg border p-7'>
      <div className='flex items-center gap-3 text-black/50'>
        <span className='text-2xl font-extrabold'>EXP</span>
        <div className='flex justify-around w-full'>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-[6px] w-5 rounded-sm ${i < 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
      <Image src='/assets/character/card/level1.png' width={344} height={344} alt='character-img' />
      <div className='flex gap-6'>
        <span className='text-[40px] font-extrabold text-red-500'>LV : 20</span>
        <div className='flex items-center justify-center rounded-3xl border border-black px-9 py-3'>
          <span className='text-xl'>똑똑한 병아리</span>
        </div>
      </div>
    </div>
  );
};

export default MainCharacter;
