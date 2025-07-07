// lib/coverArtDB.ts
import { openDB } from 'idb';

export const COVER_DB = 'coverArt-db';
export const COVER_STORE = 'coverArt';

export async function getCoverArtDB() {
  return openDB(COVER_DB, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(COVER_STORE)) {
        db.createObjectStore(COVER_STORE);
      }
    },
  });
}

export async function saveCoverArt(id: string, imageBlob: Blob) {
  const db = await getCoverArtDB();
  await db.put(COVER_STORE, imageBlob, id);
}

export async function getCoverArt(id: string): Promise<Blob | null> {
  const db = await getCoverArtDB();
  return await db.get(COVER_STORE, id);
}

export async function getCoverArtAll(): Promise<Blob[]> {
  const db = await getCoverArtDB();
  return await db.getAll(COVER_STORE);
}

export async function deleteCoverArt(id: string) {
  const db = await getCoverArtDB();
  await db.delete(COVER_STORE, id);
}
