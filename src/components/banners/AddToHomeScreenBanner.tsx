import { faArrowUpFromBracket, faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

export default function AddToHomeScreenBanner({ shouldShow }: { shouldShow?: boolean, addToHomeScreenDismissed?: boolean }) {
  const [dismissed, setDismissed] = useState<boolean>(true);

  // Check if the banner was previously dismissed from localStorage
  useEffect(() => {
    const savedDismissed = localStorage.getItem('addToHomeScreenDismissed');
    setDismissed(savedDismissed === 'true'); // If already dismissed, do not show the banner
  }, []);

  if (!shouldShow || dismissed) return null;

  return (
    <div className='fixed left-0 bottom-0 right-0 p-[1rem] z-[9999] fade-in bg-golden flex flex-col justify-center items-center gap-2'>
      <p>
        🚀 Install this app:
      </p>
      <p>
        1. Tap <span className='p-1 rounded-md bg-white'><FontAwesomeIcon icon={faArrowUpFromBracket} /> <strong>Share</strong></span>
      </p>
      <p>
        2. then <span className='p-1 rounded-md bg-white'><FontAwesomeIcon icon={faSquarePlus} /> <strong>Add to Home Screen</strong></span>
      </p>
      <button
        onClick={async () => {
          // Save dismissal state to localStorage
          localStorage.setItem('addToHomeScreenDismissed', 'true');
          setDismissed(true); // Update the state to hide the banner
        }}
        className='p-1 rounded-md bg-white flex flex-row items-center gap-1'
      >
        <FontAwesomeIcon icon={faCircleCheck} /> Got it!
      </button>
    </div>
  );
}
