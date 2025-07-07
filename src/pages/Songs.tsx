import { faMusic } from '@fortawesome/free-solid-svg-icons';
import DataSection from '../components/DataSection';
import { useSearch3 } from '../hooks/useSearch3';
import { useStarred } from '../hooks/useStarred';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Songs() {
  const { songs } = useSearch3();
  const { starred } = useStarred();

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <FontAwesomeIcon icon={faMusic} /> Songs
      </div>

      <DataSection data={songs} type='songs' list starred={starred} />
    </>
  )
}
