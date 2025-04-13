// HeaderTitle.tsx (클라이언트)
'use client';

import { usePathname } from 'next/navigation';
import { getTitleFromPath } from './utils/getTitleFromPath';
import Typography from '@/components/ui/typography';

export const HeaderTitle = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  return (
    <Typography size='xl' weight='bold'>
      {title}
    </Typography>
  );
};
