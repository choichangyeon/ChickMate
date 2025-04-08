import { useEffect, useState } from 'react';
import { getBookmarkByJobPostingId } from '@/features/(job)/api/client-services';

export const useBookmark = (jobPostingId: number) => {
  // undefined: 아직 로딩 전 상태
  // true / false: API 호출 완료 후 북마크 여부
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchBookmark = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookmarked = await getBookmarkByJobPostingId(jobPostingId);
        if (!cancelled) setIsBookmarked(bookmarked);
      } catch (error) {
        if (!cancelled) setError(error as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBookmark();

    // cleanup
    return () => {
      cancelled = true;
    };
  }, []);

  return { isBookmarked, loading, error };
};
