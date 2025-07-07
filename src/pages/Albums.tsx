import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useSearch3 } from '../hooks/useSearch3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataSection from '../components/DataSection';
import { useStarred } from '../hooks/useStarred';

export default function Albums() {
  const { albums } = useSearch3();
  const { starred } = useStarred();

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <FontAwesomeIcon icon={faFolder} /> Albums
      </div>

      <DataSection data={albums} type='albums' gallery starred={starred} />
    </>
  )
}
