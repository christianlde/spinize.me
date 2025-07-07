import { useEffect, useState } from 'react';
import { isStarredItem, star, unStar } from '../lib/starredItem';

export function useStarredItem(
  id: string,
  type: 'song' | 'album' | 'artist' = 'song'
) {
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      setLoading(true);
      try {
        const actualStatus = await isStarredItem(id, type);
        if (isMounted) setIsStarred(actualStatus);
      } catch {
        if (isMounted) setError('Failed to fetch star status');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [id, type]);

  const toggleStar = async () => {
    if (!id) return;

    setLoading(true);
    try {
      if (isStarred) {
        await unStar(id);
        setIsStarred(false);
      } else {
        await star(id);
        setIsStarred(true);
      }
    } catch {
      setError('Failed to toggle star');
    } finally {
      setLoading(false);
    }
  };

  return { isStarred, setIsStarred, toggleStar, loading, error };
}
