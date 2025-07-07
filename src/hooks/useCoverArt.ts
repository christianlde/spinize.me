// import { getCredentials, type Credentials } from '../lib/credentials';
// import { getCoverArt } from '../lib/coverArtDB'; // LOCAL DB method
// import { CLIENT, VERSION } from '../pages/Home';

export function useCoverArt(
  id: string | undefined,
  // type: 'song' | 'album' | 'artist' | 'playlist' = 'song'
) {
  // const DEFAULT_COVER = `/${type}Cover.jpg`;
  // const [cover, setCover] = useState<string>(DEFAULT_COVER);
  const DEFAULT_COVER = id ? undefined : undefined;
  // const [cover, setCover] = useState<string | undefined>(DEFAULT_COVER);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCover = async () => {
  //     if (!id) return;
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       // Step 1: Check if cover is downloaded
  //       const localCover = await getCoverArt(id);

  //       if (localCover) {
  //         const localUrl = URL.createObjectURL(localCover);
  //         setCover(localUrl);
  //         return;
  //       }

  //       // Step 2: If not available locally, fetch from server
  //       const creds = (await getCredentials()) as Credentials;
  //       const url =
  //         `${creds.url}/rest/getCoverArt?id=${id}` +
  //         `&u=${creds.username}` +
  //         `&t=${creds.token}` +
  //         `&s=${creds.salt}` +
  //         `&c=${CLIENT}` +
  //         `&v=${VERSION}`;
  //         // + `&_=${Date.now()}`;

  //       // const img = new Image();
  //       // img.onload = () => {
  //       //   setCover(url);
  //       //   setLoading(false);
  //       // };
  //       // img.onerror = () => {
  //       //   setError('Cover failed to load');
  //       //   setLoading(false);
  //       // };
  //       // img.src = url;
  //       setCover(url);
  //       return;
  //     } catch {
  //       setError('Error fetching cover art');
  //       setLoading(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCover();
  // }, [id]);

  // return { cover, loading, error };
  return { cover: DEFAULT_COVER, loading: false, error: null };
}
