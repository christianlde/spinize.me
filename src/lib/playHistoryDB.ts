import { openDB } from 'idb';
import type { PlayHistoryEntry } from '../types/PlayHistory';
import type { Song } from '../types/Song';

export const HISTORY_DB = 'playHistory-db';
export const HISTORY_STORE = 'playHistory';

export async function getPlayHistoryDB() {
  return openDB(HISTORY_DB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        const store = db.createObjectStore(HISTORY_STORE, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('playedAt', 'playedAt');
      }
    },
  });
}

export async function savePlayHistory(song: Song) {
  const db = await getPlayHistoryDB();
  const entry: PlayHistoryEntry = {
    songId: song.id,
    song,
    playedAt: Date.now(),
  };
  await db.add(HISTORY_STORE, entry);

  // Optional: Trim to last 100 entries
  const entries = await getAllPlayHistory();
  if (entries.length > 100) {
    const excess = entries.slice(100);
    for (const e of excess) {
      await db.delete(HISTORY_STORE, e.id!);
    }
  }
}

export async function getAllPlayHistory(): Promise<PlayHistoryEntry[]> {
  const db = await getPlayHistoryDB();
  const tx = db.transaction(HISTORY_STORE, 'readonly');
  const store = tx.objectStore(HISTORY_STORE);
  const index = store.index('playedAt');

  const result: PlayHistoryEntry[] = [];
  let cursor = await index.openCursor(null, 'prev');
  while (cursor) {
    result.push(cursor.value);
    cursor = await cursor.continue();
  }

  return result;
}

export async function deletePlayHistory(id: number) {
  const db = await getPlayHistoryDB();
  await db.delete(HISTORY_STORE, id);
}

export async function clearPlayHistory() {
  const db = await getPlayHistoryDB();
  await db.clear(HISTORY_STORE);
}

export async function getMostPlayedFromDB(limit = 50): Promise<Song[]> {
  const history = await getAllPlayHistory();

  const playCountMap = new Map<string, { song: Song; count: number }>();

  for (const entry of history) {
    const existing = playCountMap.get(entry.songId);
    if (existing) {
      existing.count += 1;
    } else {
      playCountMap.set(entry.songId, { song: entry.song, count: 1 });
    }
  }

  // Convert to array and sort by play count descending
  const sorted = Array.from(playCountMap.values())
    .sort((a, b) => b.count - a.count)
    .map((entry) => entry.song);

  return sorted.slice(0, limit);
}