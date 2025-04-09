'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NavItems } from './data/nav-items';

type Props = {
  menu: NavItems;
};

const ButtonNav = ({ menu }: Props) => {
  const router = useRouter();
  const handleNavigate = async () => {
    await signOut({ redirect: false }).then(() => {
      router.replace(menu.path);
      router.refresh();
    });
  };

  return (
    <button onClick={handleNavigate}>
      {menu?.icons} {menu.name}
    </button>
  );
};

export default ButtonNav;
