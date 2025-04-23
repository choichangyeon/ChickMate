'use client';
import { useMemo } from 'react';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { NavItems } from '@/features/layout/data/nav-items';
import { PUBLIC_PAGE } from '@/constants/path-constant';

type Props = {
  menu: NavItems;
};

const ButtonNav = ({ menu }: Props) => {
  const router = useRouter();
  const currentPath = usePathname();
  const isPublicPage = useMemo(() => PUBLIC_PAGE.includes(currentPath), [currentPath]);

  const handleNavigate = async () => {
    await signOut({ redirect: false }).then(() => {
      if (!isPublicPage) router.replace(menu.path);
      router.refresh();
    });
  };

  return <button onClick={handleNavigate}>{menu?.icon}</button>;
};

export default ButtonNav;
