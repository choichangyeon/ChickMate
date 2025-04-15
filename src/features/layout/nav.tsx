'use client';

import { useMemo } from 'react';
import ButtonNav from '@/features/layout/button-nav';
import { Private_Nav_Items, Public_Nav_Items, type NavItems } from '@/features/layout/data/nav-items';

import LinkNav from '@/features/layout/link-nav';
import { User } from '@/types/user';
import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  user?: User;
};

const { ON_BOARDING } = PATH;
export const Nav = ({ user }: Props) => {
  const menus: NavItems[] = useMemo(() => (user ? Private_Nav_Items : Public_Nav_Items), [user]);
  return (
    <nav className='flex h-screen w-[52px] flex-col items-center justify-center bg-[#222] px-1 py-8 text-cool-gray-50'>
      <Link href={ON_BOARDING} className='mb-12 block rounded-lg border'>
        칰
      </Link>
      <ul className={clsx('flex h-full flex-col items-center gap-2', user ? 'justify-between' : 'flex-start')}>
        {menus.map((menu) => (
          <li key={`menu_${menu.name}`} className={menu.class}>
            {menu.type === 'link' ? <LinkNav menu={menu} /> : <ButtonNav menu={menu} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
