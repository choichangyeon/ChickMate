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
    <nav className='nav-shadow flex h-screen w-[52px] flex-col items-center justify-center bg-cool-gray-900 px-1 py-8 text-cool-gray-50'>
      <Link href={ON_BOARDING} className='mb-12 block'>
        <ChickLogo />
      </Link>

      <ul className={clsx('flex h-full flex-col items-center gap-4', session ? 'justify-start' : 'justify-end')}>
        {menus.map((menu) => (
          <li key={`menu_${menu.name}`} className={clsx('group relative', menu.class)}>
            {menu.type === 'link' ? <LinkNav menu={menu} /> : <ButtonNav menu={menu} />}
            <span className='absolute left-full top-1/2 z-10 ml-4 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-cool-gray-900 px-2 py-1 text-sm text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:inline group-hover:opacity-100'>
              {menu.name}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
