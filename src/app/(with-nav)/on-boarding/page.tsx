import { getServerSession } from 'next-auth';
import MainCharacter from '@/features/character/main-character';
import { onBoardingList } from '@/features/on-boarding/data/on-boarding-list';
import ListCard from '@/features/on-boarding/list-card';
import { authOptions } from '@/utils/auth-option';

const OnBoarding = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex h-[100dvh] w-full items-center justify-center'>
      <div className='flex w-[62%] max-w-[893px] flex-col justify-center'>
        {/* ----- Intro 영역 ----- */}
        <div className='mb-9'>
          <div className='text-3xl font-bold'>오늘도 힘차게 성장해 볼까요?</div>
          <div className='text-xl text-cool-gray-500'>우리는 언제 불닭이 될 수 있을까?</div>
        </div>

        {/* ----- 본문 영역 ----- */}
        <div className='flex h-[398px] items-center justify-between gap-5'>
          <div className='flex h-full flex-1 flex-col justify-between'>
            {onBoardingList.map((list, index) => (
              <ListCard key={`on_boarding_list_${index}`} {...list} />
            ))}
          </div>

          {/* ----- 캐릭터 카드 영역 ----- */}
          <MainCharacter session={session} />
        </div>
      </div>
    </main>
  );
};

export default OnBoarding;
