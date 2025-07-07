import DataSection from '../components/DataSection';
import { useStarred } from '../hooks/useStarred';
import WelcomeBanner from '../components/homepage/WelcomeBanner';
import Stats from '../components/homepage/Stats';
import { useDownloads } from '../hooks/useDownloads';

export const CLIENT = 'spinize'
export const VERSION = '1.16.1'

export default function Downloads() {
  const { songs, albums, artists } = useDownloads();
  const { starred } = useStarred();

  return (
    <>
      <WelcomeBanner />

      <div className='xl:hidden'>
        <DataSection type="songs" data={songs.filter((_, index) => index < 6)} bricks starred={starred} />
      </div>
      <div className='hidden xl:block'>
        <DataSection type="songs" data={songs} starred={starred} />
      </div>

      <DataSection type="albums" data={albums} starred={starred} />

      <DataSection type="artists" data={artists} starred={starred} />

      <Stats />
    </>
  );
}
