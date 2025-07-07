import { useEffect, useState } from 'react';
import { getCredentials, type Credentials } from '../lib/credentials';
import { CLIENT, VERSION } from '../pages/Home';
import axios from 'axios';
import type { Starred } from '../types/Starred';

export function useStarred() {
  const [item, setItem] = useState<Starred | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        setLoading(true);
        const creds = (await getCredentials() as unknown) as Credentials;

        // Perform search3 request using axios
        const res = await axios.get(`${creds.url}/rest/getStarred`, {
          params: {
            u: creds.username,
            t: creds.token,
            s: creds.salt,
            c: CLIENT,
            v: VERSION,
            f: 'json',
          },
        });

        setItem(res.data['subsonic-response'].starred);
      } catch {
        // setError(err?.message || 'Error fetching cover art');
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, []);

  return { starred: item, loading, error };
}



