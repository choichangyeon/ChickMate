import Link from 'next/link';
import type { NavItems } from '@/features/layout/data/nav-items';
import { usePathname } from 'next/navigation';

type Props = {
  menu: NavItems;
};

const LinkNav = ({ menu }: Props) => {
  const path = usePathname();
  const isActive = path.startsWith(menu.path);

  return (
    <Link href={menu.path} aria-label={`${menu.name} 페이지로 이동하기`}>
      {isActive ? menu?.fullIcon : menu?.icon}
    </Link>
  );
};

export default LinkNav;
