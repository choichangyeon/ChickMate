import { PATH } from '@/constants/path-constant';
import { headers } from 'next/headers';

const {
  MY_PAGE,
  RESUME: { ROOT },
  JOB,
} = PATH;

export const getTitleFromHeaders = () => {
  const allHeaders = headers();
  const pathname = allHeaders.get('x-pathname');

  if (!pathname) return 'ChickMate';

  if (pathname.startsWith(MY_PAGE)) {
    return '마이페이지';
  } else if (pathname.startsWith(ROOT)) {
    return '자소서 작성하기';
  } else if (pathname.startsWith(JOB)) {
    return '맞춤형 채용공고';
  }

  return 'ChickMate';
};
