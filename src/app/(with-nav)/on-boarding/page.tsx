import { getServerSession } from 'next-auth';
import MainCharacter from '@/features/character/main-character';
import { onBoardingList } from '@/features/on-boarding/data/on-boarding-list';
import ListCard from '@/features/on-boarding/list-card';
import { authOptions } from '@/utils/auth-option';

const OnBoarding = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex h-[100dvh] w-full items-center justify-center mobile:p-4'>
      <div className='flex w-[62%] max-w-[893px] flex-col justify-center mobile:w-full mobile:max-w-full tablet:w-[90%]'>
        {/* ----- Intro 영역 ----- */}
        <div className='mb-9 mobile:mb-4 mobile:text-center'>
          <div className='text-3xl font-bold mobile:text-lg'>오늘도 힘차게 성장해 볼까요?</div>
          <div className='text-base text-cool-gray-500 mobile:text-sm'>우리는 언제 불닭이 될 수 있을까?</div>
        </div>

        {/* ----- 본문 영역 ----- */}
        <div className='flex h-full items-center justify-between gap-5 mobile:w-full mobile:flex-col-reverse mobile:gap-3 desktop:h-[398px]'>
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
