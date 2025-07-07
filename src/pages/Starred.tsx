import { faStar } from '@fortawesome/free-solid-svg-icons';
import DataSection from '../components/DataSection';
import { useStarred } from '../hooks/useStarred';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Starred() {
  const { starred } = useStarred();

  return (
    <>
      <div className='z-[2] flex flex-row gap-2 justify-between items-center'>
        <FontAwesomeIcon icon={faStar} /> Starred
      </div>

      <DataSection data={starred?.song || null} type='songs' bricks starred={starred} />
      <DataSection data={starred?.album || null} type='albums' starred={starred} />
      <DataSection data={starred?.artist || null} type='artists' starred={starred} />
    </>
  )
}
