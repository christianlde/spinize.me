import { openDB } from 'idb';

export const DB_NAME = 'subsonic-auth';
export const STORE_NAME = 'credentials';

export interface Credentials {
  url: string;
  username: string;
  token: string;
  salt: string;
}

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveCredentials(creds: Credentials): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, creds, 'auth');
}

export async function getCredentials(): Promise<Credentials | null> {
  const db = await getDB();
  const creds = await db.get(STORE_NAME, 'auth');
  return creds || null;
}

export async function clearCredentials(): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_NAME, 'auth');
}
