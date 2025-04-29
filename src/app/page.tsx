import Link from 'next/link';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;
const Home = () => {
  return (
    <main className='main-bg-class tablet:tablet-bg-class mobile:mobile-bg-class flex w-screen flex-col items-center justify-center'>
      <div className='mb-7 break-words text-6xl font-thin mobile:text-2xl tablet:text-4xl'>
        우리는 언제 불닭이 될 수 있을까?
        <br />
      </div>
      <div className='mb-7 flex items-center text-6xl font-thin mobile:text-2xl tablet:text-4xl'>
        스마트 면접 코칭
        <Typography as='h1' className='text-6xl font-black text-primary-orange-600 mobile:text-2xl tablet:text-4xl'>
          Chick Mate
        </Typography>
      </div>

      <div className='mb-16 text-xl font-thin mobile:text-lg tablet:text-2xl'>
        칰메이트와 함께하는 <span className='font-semibold'>AI 스마트 에이전트!</span>
      </div>
      <Link
        href={ON_BOARDING}
        className='button-hover-focus block w-[536px] rounded-[50px] border border-cool-gray-900 p-[10px] text-center text-2xl font-thin mobile:w-[70vw] mobile:text-xl'
      >
        지금 바로 시작해볼까요?
      </Link>
    </main>
  );
};

export default Home;
