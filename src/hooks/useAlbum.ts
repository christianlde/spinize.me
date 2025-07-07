import { useEffect, useState } from 'react';
import { getCredentials, type Credentials } from '../lib/credentials';
import { CLIENT, VERSION } from '../pages/Home';
import axios from 'axios';
import type { Album } from '../types/Album';

export function useAlbum(id: string | undefined) {
    const [item, setItem] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCover = async () => {
      try {
        setLoading(true);
        const creds = (await getCredentials() as unknown) as Credentials;

        // Perform search3 request using axios
        const res = await axios.get(`${creds.url}/rest/getAlbum`, {
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

        setItem(res.data['subsonic-response'].album);
      } catch {
        // setError(err?.message || 'Error fetching cover art');
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, [id]);

  return { album: item, loading, error };
}



