import { useEffect, useRef } from 'react';

type Props = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage }: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return targetRef;
};
