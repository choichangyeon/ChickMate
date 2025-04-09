'use client';

import { useMemo } from 'react';
import { Private_Nav_Items, Public_Nav_Items } from './data/nav-items';
import type { NavItems } from './data/nav-items';
import LinkNav from './link-nav';
import ButtonNav from './button-nav';
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
