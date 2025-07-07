import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStarredItem } from "../../hooks/useStarredItem";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface Props {
  id: string;
  className?: string;
  type?: 'song' | 'album' | 'artist';
}

export default function StarToggle({
  id,
  className = '',
  type = 'song'
}: Props) {
  const { isStarred, loading, toggleStar } = useStarredItem(id, type);

  return (
    <button onClick={toggleStar} disabled={loading} className={className}>
      <FontAwesomeIcon
        icon={loading ? faSpinner : isStarred ? faStar : regularStar}
        spin={loading}
      />
    </button>
  );
}
