import { faPlay, faRadio } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SmartRadioBanner() {
    return <Link to='/app/radio' className='w-full min-h-18 h-fit max-h-48 flex flex-row justify-between items-center gap-2 bg-zinc-800 border-2 border-color-golden text-golden rounded-md p-4'>
        {/* <h1>Play the radio (24/7) of personal music from your library ;)</h1> */}
        <h1>Play from public radio stations (24/7)</h1>
        <div className='flex flex-row gap-1 items-center'>
            <FontAwesomeIcon icon={faPlay} size='lg' />
            <FontAwesomeIcon icon={faRadio} size='lg' />
        </div>
    </Link>
}