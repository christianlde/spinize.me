import { getSongDB, SONG_STORE } from "../lib/songDB";

export async function isSongDownloaded(id: string): Promise<boolean> {
  const db = await getSongDB();
  return (await db.get(SONG_STORE, id)) !== undefined;
}
