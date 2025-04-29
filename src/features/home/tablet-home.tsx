import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
import React from 'react';

const { ON_BOARDING } = PATH;

const TabletHome = () => {
  return (
    <main className='tablet-bg-class'>
      <div>
        <Typography as='h1' className='text-8xl font-black text-primary-orange-600'>
          Chick Mate
        </Typography>
        <h2 className='text-center text-xl font-thin'>
          칰메이트와 함께하는 <span className='font-bold'>AI 스마트 에이전트!</span>
        </h2>
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

export default TabletHome;
