import Link from 'next/link';
import type { NavItems } from '@/features/layout/data/nav-items';
import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  menu: NavItems;
};

const LinkNav = ({ menu }: Props) => {
  const path = usePathname();
  const isActive = path.startsWith(menu.path);

  return <Link href={menu.path}>{isActive ? menu?.fullIcon : menu?.icon}</Link>;
};

export default LinkNav;
