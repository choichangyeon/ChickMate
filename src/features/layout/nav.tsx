'use client';

import { useMemo } from 'react';
import ButtonNav from '@/features/layout/button-nav';
import type { NavItems } from '@/features/layout/data/nav-items';
import { Private_Nav_Items, Public_Nav_Items } from '@/features/layout/data/nav-items';
import LinkNav from '@/features/layout/link-nav';
import { User } from '@/types/user';

type Props = {
  user?: User;
};

export const Nav = ({ user }: Props) => {
  const menus: NavItems[] = useMemo(() => (user ? Private_Nav_Items : Public_Nav_Items), [user]);

  return (
    <nav className='absolute left-0 top-0 h-full bg-red-950 text-white opacity-90'>
      <span>ChickMate</span>
      <ul>
        {menus.map((menu) => (
          <li key={`menu_${menu.name}`}>
            {menu.type === 'link' ? <LinkNav menu={menu} /> : <ButtonNav menu={menu} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
