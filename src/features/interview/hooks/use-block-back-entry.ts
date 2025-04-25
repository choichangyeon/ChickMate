// hooks/useBlockBackEntry.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useBlockBackEntry = (fallbackPath: string) => {
  const router = useRouter();

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      event.preventDefault();
      const path = window.location.pathname;

      if (/^\/interview\/live\/\d+$/.test(path)) {
        router.replace(fallbackPath);
        window.removeEventListener('popstate', onPopState);
      }
    };

    window.addEventListener('popstate', onPopState);
  }, [router, fallbackPath]);
};

export default useBlockBackEntry;
