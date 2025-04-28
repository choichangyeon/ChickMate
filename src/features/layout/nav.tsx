'use client';

import { useMemo } from 'react';
import ButtonNav from '@/features/layout/button-nav';
import { Private_Nav_Items, Public_Nav_Items, type NavItems } from '@/features/layout/data/nav-items';
import LinkNav from '@/features/layout/link-nav';
import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
import clsx from 'clsx';
import { Session } from 'next-auth';
import { ChickLogo } from '@/components/icons/chick-logo';

type Props = {
  session: Session | null;
};

const { ON_BOARDING } = PATH;
export const Nav = ({ session }: Props) => {
  const menus: NavItems[] = useMemo(() => (session ? Private_Nav_Items : Public_Nav_Items), [session]);

  return (
    <nav className='nav-shadow mobile:z-nav mobile:w-full mobile:h-[52px] mobile:fixed mobile:bottom-0 flex h-screen w-[52px] flex-col items-center justify-center bg-cool-gray-900 px-1 py-8 text-cool-gray-50'>
      <Link href={ON_BOARDING} className='mobile:hidden mb-12 block' aria-label='홈으로 이동하기'>
        <ChickLogo />
      </Link>

      <ul
        className={clsx(
          'mobile:flex-row mobile:w-full mobile:px-1 mobile:justify-evenly flex h-full flex-col items-center justify-start gap-4'
        )}
      >
        {menus.map((menu) => (
          <li key={`menu_${menu.name}`} className={clsx('group relative', menu.class)}>
            {menu.type === 'link' ? <LinkNav menu={menu} /> : <ButtonNav menu={menu} />}
            <span className='mobile:group-hover:hidden absolute left-full top-1/2 z-overlay ml-4 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-cool-gray-900 px-2 py-1 text-sm text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:inline group-hover:opacity-100'>
              {menu.name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
