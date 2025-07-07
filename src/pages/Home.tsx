// import DataSection from '../components/DataSection';
// import { useSearch3 } from '../hooks/useSearch3';
// import { useStarred } from '../hooks/useStarred';
import ContentHeader from '../components/ContentHeader';
import WelcomeBanner from '../components/homepage/WelcomeBanner';
import SmartRadioBanner from '../components/homepage/SmartRadioBanner';
import ContinueListeningSection from '../components/homepage/ContinueListeningSection';
import FavoriteHighlight from '../components/homepage/FavoriteHighlight';
import Stats from '../components/homepage/Stats';
import StarredRewindSection from '../components/homepage/StarredRewindSection';
import UnderratedGemsSection from '../components/homepage/UnderratedGemsSection';
import DailyMixSection from '../components/homepage/DailyMixSection';
import { Link } from 'react-router-dom';

export const CLIENT = 'spinize'
export const VERSION = '1.16.1'

export default function Home() {
  // const { songs, albums, artists, refresh } = useSearch3();
  // const { starred } = useStarred();

  // const refreshHomepageContent = async () => {
  //   await refresh(); // this re-fetches only the content
  // };

  return (
    <>
      <ContentHeader />

      <WelcomeBanner />

      <SmartRadioBanner />

      {/* <button
        onClick={refreshHomepageContent}
        className="bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white">
        Spin Again 🔁
      </button> */}

      <ContinueListeningSection />

      {/* Your Daily Mix */}
      <DailyMixSection />

      {/* Starred Rewind */}
      <StarredRewindSection />

      {/* Underrated Gems - (less played songs from favorite albums) */}
      <UnderratedGemsSection />

      {/* <DataSection type="your favorite artist" data={[favoriteArtist]} /> */}
      <FavoriteHighlight />

      <div className='w-full flex flex-col justify-center items-center gap-2'>
        <h3 className='text-xl font-bold'>Want more recommendations?</h3>
        <Link to='/app/explore' className='text-golden tracking-wider font-semibold bg-zinc-800 rounded-md px-3 py-2'>Explore the realm of music!</Link>
      </div>

      <Stats />
    </>
  );
}
