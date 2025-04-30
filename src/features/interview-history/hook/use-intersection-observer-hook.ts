import { RefObject, useEffect, useState } from 'react';

const defaultOptions = {
  root: null,
  threshold: 0.1,
};

type Props = {
  ref: RefObject<Element>;
  options?: IntersectionObserverInit;
};

export const useInterSectionObserverHook = (ref: Props['ref'], options: Props['options'] = defaultOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        ...options,
      }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return { isVisible };
};
