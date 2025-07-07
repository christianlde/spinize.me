import { faGlobe, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { makeLink } from "./makeLink";
import useAuth from "../../hooks/useAuth";

export default function MobileNavigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const auth = useAuth() as { authenticated: boolean | null };

  return (
    <header className="sticky left-0 top-0 right-0 w-full max-h-[4rem] z-[25] text-white overflow-hidden bg-black flex flex-row gap-2 justify-center items-center mb-4 xl:mb-0">
      <nav className="px-4 py-2 w-full flex xl:hidden flex-row gap-2 justify-between items-center">
        <ul className="w-full flex flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10 items-center justify-between">
          <li className="flex flex-row items-center gap-1">
            <h2 className="text-2xl font-semibold">Spinize</h2>
            <img
            src="/favicon.png"
            alt="Spinize Logo"
            width={32}
            height={32}
            />
          </li>
          {auth?.authenticated ? (
            makeLink('log-out', 'Log out', faRightToBracket, pathname)
          ) : (
            makeLink('auth', 'Authenticate', faGlobe, pathname)
          )}
        </ul>
      </nav>
    </header>
  );
}
