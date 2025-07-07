import { useParams } from 'react-router-dom';
import { useSearch3 } from '../hooks/useSearch3';
import DataSection from '../components/DataSection';
import { useStarred } from '../hooks/useStarred';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchInput from '../components/search/SearchInput';

export default function Search() {
  const { query } = useParams();
  const { songs, albums, artists } = useSearch3(query || '');
  const { starred } = useStarred();

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-start items-center mb-2 text-xl font-semibold'>
        <FontAwesomeIcon icon={faMagnifyingGlass} /> Search <span className='text-golden'>{query}</span>
      </div>

      <div className='xl:hidden'>
        <SearchInput />
      </div>

      <DataSection data={songs} starred={starred} type='songs' />
      <DataSection data={albums} starred={starred} type='albums' />
      <DataSection data={artists} starred={starred} type='artists' />
    </>
  )
}
