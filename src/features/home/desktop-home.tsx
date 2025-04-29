import Link from 'next/link';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';

const { ON_BOARDING } = PATH;
const DesktopHome = () => {
  return (
    <main className='main-bg-class'>
      <div className='mb-7 break-words text-6xl font-thin'>
        우리는 언제 불닭이 될 수 있을까?
        <br />
      </div>
      <div className='mb-7 flex items-center text-6xl font-thin'>
        스마트 면접 코칭
        <Typography as='h1' className='text-6xl font-black text-primary-orange-600'>
          Chick Mate
        </Typography>
      </div>

      <div className='mb-16 text-xl font-thin'>
        칰메이트와 함께하는 <span className='font-semibold'>AI 스마트 에이전트!</span>
      </div>
      <Link
        href={ON_BOARDING}
        className='button-hover-focus block w-[536px] rounded-[50px] border border-cool-gray-900 p-[10px] text-center text-2xl font-thin'
      >
        지금 바로 시작해볼까요?
      </Link>
    </main>
  );
};

export default DesktopHome;
