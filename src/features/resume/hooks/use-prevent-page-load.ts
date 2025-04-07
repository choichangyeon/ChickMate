import { useEffect } from 'react';

export const usePreventPageUnload = (shouldPrevent: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldPrevent) return;
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldPrevent]);
};
