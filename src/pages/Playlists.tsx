import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataSection from '../components/DataSection';
import CreateNewPlaylistButton from '../components/playlists/CreateNewPlaylistButton';
import Pagination from '../components/search/Pagination';
import { usePlaylists } from '../hooks/usePlaylists';
import { faFolder, faList } from '@fortawesome/free-solid-svg-icons';

export default function Playlists() {
  const { playlists } = usePlaylists();
  // const page = parseInt(params.page || '1', 10); // default page 1
  // const count = parseInt(params.count || '8', 10); // default count 8
  const page = parseInt('1', 10); // default page 1
  const count = parseInt('8', 10); // default count 8
  // const offset = (page - 1) * count;
  const total: number = 1000;

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <FontAwesomeIcon icon={faList} /> Playlists
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-bold'>Scroll through your playlists, to find the one which suits your needs.</h1>
          <p className='text-sm font-semibold'>P.S. : There is a pagination system for you convinience.</p>
        </div>

        <div>
          <FontAwesomeIcon icon={faFolder} className="text-3xl" />
        </div>
      </div>

      <CreateNewPlaylistButton />

      <DataSection type='playlists' data={playlists} gallery starred={null} />
      
      <Pagination page={page} count={count} total={total} />
    </>
  )
}
