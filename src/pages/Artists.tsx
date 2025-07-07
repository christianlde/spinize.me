import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSearch3 } from '../hooks/useSearch3';
import { useStarred } from '../hooks/useStarred';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataSection from '../components/DataSection';

export default function Artists() {
  const { artists } = useSearch3();
  const { starred } = useStarred();

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <FontAwesomeIcon icon={faUser} /> Artists
      </div>

      <DataSection data={artists} type='artists' gallery starred={starred} />
    </>
  )
}
