// HeaderTitle.tsx (클라이언트)
'use client';

import { usePathname } from 'next/navigation';
import { getTitleFromPath } from '@/features/layout/utils/getTitleFromPath';
import Typography from '@/components/ui/typography';

export const HeaderTitle = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <div className='mobile:p-0 px-8'>
      <Typography as='h1' className='mobile:text-lg text-xl font-bold'>
        {title}
      </Typography>
    </div>
  );
};
