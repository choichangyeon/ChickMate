import Link from 'next/link';
import type { NavItems } from '@/features/layout/data/nav-items';

type Props = {
  menu: NavItems;
};

const LinkNav = ({ menu }: Props) => {
  return <Link href={menu.path}>{menu?.icon}</Link>;
};

export default LinkNav;
