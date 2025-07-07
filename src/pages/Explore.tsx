import { useParams } from 'react-router-dom';
import { useSearch3 } from '../hooks/useSearch3';
import DataSection from '../components/DataSection';
import { useStarred } from '../hooks/useStarred';
import ContentHeader from '../components/ContentHeader';
import SearchInput from '../components/search/SearchInput';
import { useRandomSongs } from '../hooks/useRandomSongs';

export default function Explore() {
  const { query } = useParams();
  const { songs } = useRandomSongs();
  const { albums, artists } = useSearch3(query || '');
  const { starred } = useStarred();

  return (
    <>
      <div className='xl:hidden pb-4'>
        <SearchInput />
      </div>

      <ContentHeader />

      {/* <div className='xl:hidden'>
        <DataSection type="songs" data={songs ? songs.filter((_, index) => index < 6) : null} bricks starred={starred} />
      </div>
      <div className='hidden xl:block'>
        <DataSection type="songs" data={songs} starred={starred} />
      </div> */}

      <DataSection data={songs} starred={starred} type='songs' bricks />
      <DataSection data={albums} starred={starred} type='albums' />
      <DataSection data={artists} starred={starred} type='artists' />
    </>
  )
}
