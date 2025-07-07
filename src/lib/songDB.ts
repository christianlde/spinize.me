// lib/songDB.ts
import { openDB } from 'idb';
import type { Song } from '../types/Song';
import { getCredentials } from './credentials';
import { CLIENT, VERSION } from '../pages/Home';

export const SONG_DB = 'songs-db';
export const SONG_STORE = 'songs';

export async function getSongDB() {
  return openDB(SONG_DB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SONG_STORE)) {
        db.createObjectStore(SONG_STORE);
      }
    },
  });
}

export async function saveSong(song: Song): Promise<void> {
  const db = await getSongDB();
  const creds = await getCredentials();
  if (!creds) return;

  try {
    // Download the actual audio file as a Blob
    const res = await fetch(`${creds.url}/rest/download?id=${song.id}&u=${creds.username}&t=${creds.token}&s=${creds.salt}&c=${CLIENT}&v=${VERSION}&f=json`);
    if (!res.ok) throw new Error('Failed to download song audio');
    
    const blob = await res.blob();
    const songWithBlob: Song = {
      ...song,
      blob,
    };

    await db.put(SONG_STORE, songWithBlob, song.id);
  } catch (error) {
    console.error(`Failed to save song "${song.id}":`, error);
  }
}

export async function getSong(id: string): Promise<Song | null> {
  const db = await getSongDB();
  return await db.get(SONG_STORE, id);
}

export async function getSongAll(): Promise<Song[]> {
  const db = await getSongDB();
  return await db.getAll(SONG_STORE);
}

export async function deleteSong(id: string): Promise<void> {
  const db = await getSongDB();
  await db.delete(SONG_STORE, id);
}
