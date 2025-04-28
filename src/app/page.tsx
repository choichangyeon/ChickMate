import Link from 'next/link';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;
const Home = () => {
  return (
    <main className='flex w-screen flex-col items-center justify-center bg-[url("/assets/background.png"),url("/assets/sub_background.png")] bg-cover bg-center'>
      <div className='mobile:text-2xl mb-7 break-words text-6xl font-thin tablet:text-4xl'>
        우리는 언제 불닭이 될 수 있을까?
        <br />
      </div>
      <div className='mobile:text-2xl mb-7 flex items-center text-6xl font-thin tablet:text-4xl'>
        스마트 면접 코칭
        <Typography as='h1' className='mobile:text-2xl text-6xl font-black text-primary-orange-600 tablet:text-4xl'>
          Chick Mate
        </Typography>
      </div>

      <div className='mobile:text-lg mb-16 text-xl font-thin tablet:text-2xl'>
        칰메이트와 함께하는 <span className='font-semibold'>AI 스마트 에이전트!</span>
      </div>
      <Link
        href={ON_BOARDING}
        className='button-hover-focus mobile:text-xl mobile:w-[70vw] block w-[536px] rounded-[50px] border border-cool-gray-900 p-[10px] text-center text-2xl font-thin'
      >
        지금 바로 시작해볼까요?
      </Link>
    </main>
  );
};

export default Home;
