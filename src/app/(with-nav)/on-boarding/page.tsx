import MainCharacter from '@/features/chraracter/main-character';
import { authOptions } from '@/utils/auth-option';
import { getServerSession } from 'next-auth';

const OnBoarding = async() => {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex h-[100vh] w-full items-center justify-center bg-white pl-20'>
      <div className='flex w-[70%] flex-col justify-center'>
        <div className='mb-9 flex flex-col gap-2'>
          <p className='text-4xl font-bold'>오늘도 힘차게 성장해 볼까요?</p>
          <p className='text-2xl font-bold text-black/50'>우리는 언제 불닭이 될 수 있을까?</p>
        </div>
        <div className='flex justify-between gap-2'>
          {/* 컴포넌트 분리 */}
          <div className='flex flex-col justify-between'>
            <section className='flex items-center gap-8 rounded-lg border p-7'>
              <div className='text-yellow-400'>아이콘</div>
              <div className='flex flex-col gap-2'>
                <span className='font-bold'>자소서 연습하기</span>
                <div className='flex flex-col'>
                  <span className='text-sm text-black/50'>
                    AI 가이드를 통한 뭐뭐를 함께하면서 이렇게 저렇게 해주는 서비스
                  </span>
                  <span className='text-sm text-black/50'>
                    AI 가이드를 통한 뭐뭐를 함께하면서 이렇게 저렇게 해주는 서비스
                  </span>
                </div>
              </div>
            </section>
            <section className='flex items-center gap-8 rounded-lg border p-7'>
              <div className='text-yellow-400'>아이콘</div>
              <div className='flex flex-col gap-2'>
                <span className='font-bold'>AI 면접 준비하기</span>
                <div className='flex flex-col'>
                  <span className='text-sm text-black/50'>스트를 통해 캐릭터도 성장하면서 뭐뭐뭐 같이 해나가요!</span>
                  <span className='text-sm text-black/50'>스트를 통해 캐릭터도 성장하면서 뭐뭐뭐 같이 해나가요!</span>
                </div>
              </div>
            </section>
            <section className='flex items-center gap-8 rounded-lg border p-7'>
              <div className='text-yellow-400'>아이콘</div>
              <div className='flex flex-col gap-2'>
                <span className='font-bold'>맞춤 채용공고 확인하기</span>
                <div className='flex flex-col'>
                  <span className='text-sm text-black/50'>나는 어떤 얼마나 성장했는지 히스토리와 함께 확인해봐요.</span>
                  <span className='text-sm text-black/50'>나는 어떤 얼마나 성장했는지 히스토리와 함께 확인해봐요.</span>
                </div>
              </div>
            </section>
          </div>
          <MainCharacter session={session}/>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
