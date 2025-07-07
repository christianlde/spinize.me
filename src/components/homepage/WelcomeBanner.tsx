import { faCloud, faMoon, faMusic, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WelcomeBanner() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? (
        <p>
            <FontAwesomeIcon icon={faSun} />
            {' '}Good morning
        </p>
    ) : hour < 18 ? (
        <p>
            <FontAwesomeIcon icon={faCloud} />
            {' '}Good afternoon
        </p>
    ) : (
        <p>
            <FontAwesomeIcon icon={faMoon} />
            {' '}Good evening
        </p>
    );

    return <div className="w-full bg-700 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">{greeting} and welcome back to Spinize <FontAwesomeIcon icon={faMusic} /></h1>
        <p className="text-sm text-zinc-300">Your personal music universe, always spinning.</p>
    </div>
}