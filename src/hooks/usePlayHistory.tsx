import { useEffect, useState } from 'react';
import { getAllPlayHistory, savePlayHistory, deletePlayHistory, clearPlayHistory } from '../lib/playHistoryDB';
import type { PlayHistoryEntry } from '../types/PlayHistory';
import type { Song } from '../types/Song';

export function usePlayHistory() {
  const [history, setHistory] = useState<PlayHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllPlayHistory() as PlayHistoryEntry[];
        setHistory(data);
      } catch {
        setError('Failed to load play history');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const addToHistory = async (song: Song) => {
    try {
      await savePlayHistory(song);
      setHistory((prev) => [{
        id: history.length as number,
        songId: song.id as string,
        song: song as Song,
        playedAt: Date.now() as number,
      }, ...prev]);
    } catch (e) {
      console.error('Failed to add to history:', e);
    }
  };

  const removeFromHistory = async (id: number) => {
    try {
      await deletePlayHistory(id);
      setHistory((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error('Failed to remove from history:', e);
    }
  };

  const clearHistory = async () => {
    try {
      await clearPlayHistory();
      setHistory([]);
    } catch (e) {
      console.error('Failed to clear play history:', e);
    }
  };

  return {
    history,
    loading,
    error,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
