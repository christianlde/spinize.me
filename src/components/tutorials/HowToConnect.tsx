import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function HowToConnect() {
    return <div className="mx-auto w-full max-w-[64rem] flex flex-col gap-4 justify-start items-start">
        <h2 className="text-xl font-semibold">How to connect?</h2>

        <div className="flex flex-col gap-2 justify-start items-start">
            <p><span className="font-semibold">Step 1. /</span> Get your server&apos;s public url (ex: https://myownserver.ext).</p>
            <p><span className="font-semibold">Step 2. /</span> Get your server&apos;s credentials (ex: username + password).</p>
            <p><span className="font-semibold">Step 3. /</span> Connect to your server using your server&apos;s public url and your credentials (ex: https://myownserver.ext + username + password).</p>
        </div>

        <div className="flex flex-col gap-2 justify-start items-start">
            <h2 className="text-xl font-semibold">Current support list of subsonic APIs</h2>

            <ul className="flex flex-col gap-2 justify-start items-start pl-4">
                <li>
                    <a href={'https://github.com/navidrome/navidrome'} className="underline">
                        Navidrome <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </a>
                </li>
                <li>
                    any <u>Subsonic</u> compatible API
                </li>
            </ul>
        </div>
    </div>
}