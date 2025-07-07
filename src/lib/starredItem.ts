import axios from "axios";
import { getCredentials, type Credentials } from "./credentials";
import { CLIENT, VERSION } from "../pages/Home";
import type { Song } from "../types/Song";

export const isStarredItem = async (id: string, type: 'song' | 'album' | 'artist' = 'song'): Promise<boolean> => {
  try {
    const creds = (await getCredentials()) as Credentials;

    const res = await axios.get(`${creds.url}/rest/getStarred`, {
      params: {
        u: creds.username,
        t: creds.token,
        s: creds.salt,
        c: CLIENT,
        v: VERSION,
        id,
        f: 'json',
      },
    });

    return res.data['subsonic-response'].starred.song.some((item: Song) => item.id === id);

    const starred = res.data['subsonic-response']?.starred ?? {};
    const items = normalize(
      type === 'song' ? starred.song :
      type === 'album' ? starred.album :
      type === 'artist' ? starred.artist :
      []
    );

    return items.some((item: { id: string }) => item.id === id);
  } catch (e) {
    console.error('Error in isStarredItem:', e);
    return false;
  }
};

function normalize<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}


export const star = async (id: string) => {
  try {
    const creds = (await getCredentials()) as Credentials;

    const res = await axios.get(`${creds.url}/rest/star`, {
      params: {
        u: creds.username,
        t: creds.token,
        s: creds.salt,
        c: CLIENT,
        v: VERSION,
        id,
        f: 'json',
      },
    });

    if (res) return true;
    return false;
  } catch {
    return false;
  }
};



export const unStar = async (id: string) => {
  try {
    const creds = (await getCredentials()) as Credentials;

    const res = await axios.get(`${creds.url}/rest/unstar`, {
      params: {
        u: creds.username,
        t: creds.token,
        s: creds.salt,
        c: CLIENT,
        v: VERSION,
        id,
        f: 'json',
      },
    });

    if (res) return true;
    return false;
  } catch {
    return false;
  }
};
