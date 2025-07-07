import { Link, useParams } from 'react-router-dom';
import formatName from '../components/tools/FormatName';
import { useCoverArt } from '../hooks/useCoverArt';
import { useArtist } from '../hooks/useArtist';
// import { useStarred } from '../hooks/useStarred';
import StarToggle from '../components/player/StarToggle';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlaylistButton from '../components/album/PlaylistButton';

export default function ArtistDetail() {
  const { id } = useParams();

  const { artist } = useArtist(id);
  // const { starred } = useStarred();
  // const { cover } = useCoverArt(artist?.id, 'artist');
  const { cover } = useCoverArt(artist?.id);

  if (artist === null) return <>
    Loading...
  </>

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <Link to='/app/artists'>
          <FontAwesomeIcon icon={faAngleLeft} /> artists
        </Link>
      </div>

      <div className="flex flex-col xl:flex-row justify-center xl:justify-between items-center gap-4 mb-4">
        <img
          src={cover}
          alt={artist.name}
          width={300}
          height={300}
          className="mb-4 w-fit max-w-full h-[50svh] object-contain rounded-lg"
        />

        <div className='flex flex-col gap-2 w-full md:w-[50svh]'>
          <h1 className="text-3xl font-bold mb-4">
            {artist.name || '--'}
          </h1>

          <div>
            <Link
              to={`/app/artists/${artist.id}/${encodeURIComponent(formatName(artist.name))}`}
              className='text-gray-300'
            >
              {artist.name}
            </Link>
          </div>

          <div className="flex flex-row gap-4 justify-center items-center mt-6">
            <PlaylistButton playlist={artist.song ?? []} shuffle={false} />
            {/* <StarToggle defaultStatus={starred?.artist.some(item => item.id == artist.id)} id={artist.id} /> */}
            <StarToggle id={artist.id} />
          </div>
        </div>
      </div>
    </>
  )
}
