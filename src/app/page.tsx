import Link from 'next/link';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;
const Home = () => {
  return (
    <main className='flex w-screen flex-col items-center justify-center bg-[url("/assets/background.png"),url("/assets/sub_background.png")] bg-cover bg-center'>
      <div className='mb-7 break-words text-6xl font-thin'>
        우리는 언제 불닭이 될 수 있을까?
        <br />
      </div>
      <div className='mb-7 flex items-center text-6xl font-thin'>
        스마트 면접 코칭
        <Typography size='6xl' color='primary-600' as='h1' weight='black'>
          Chick Mate
        </Typography>
      </div>

      <div className='mb-16 text-xl font-thin'>
        칰메이트와 함께하는 <span className='font-semibold'>AI 스마트 에이전트!</span>
      </div>
      <Link
        href={ON_BOARDING}
        className='border-cool-gray-900 block w-[536px] rounded-3xl border p-[10px] text-center text-3xl font-thin'
      >
        지금 바로 시작해볼까요?
      </Link>
    </main>
  );
};

export default Home;
