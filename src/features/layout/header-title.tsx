// HeaderTitle.tsx (클라이언트)
'use client';

import { usePathname } from 'next/navigation';
import { getTitleFromPath } from '@/features/layout/utils/getTitleFromPath';
import Typography from '@/components/ui/typography';

export const HeaderTitle = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);
  return (
    <div className='px-8'>
      <Typography size='xl' weight='bold'>
        {title}
      </Typography>
    </div>
  );
};
