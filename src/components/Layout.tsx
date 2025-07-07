import PlayerUI from "./player/PlayerUI";
import Navigation from "./ui/Navigation";
import Footer from "./ui/Footer";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MobileNavigation from "./ui/MobileNavigation";
import Sidebar from "./ui/Sidebar";
import AddToHomeScreenBanner from "./banners/AddToHomeScreenBanner";
import { useEffect, useState } from "react";
import SplashScreen from "./ui/SplashScreen";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function Layout({ audioRef }: Props) {
    const { authenticated } = useAuth();
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowSplash(false), 2500);
        return () => clearTimeout(timeout);
    }, [authenticated]);

    return <div className="app-layout bg-black text-white w-screen max-w-screen h-[100svh] overflow-hidden flex flex-row justify-between items-start">
        {showSplash && <SplashScreen />}
        {/* {
            authenticated === undefined ? (
                <div>Loading...</div>
            ) : (authenticated === null || authenticated === false) ? (
                <div>
                    Server not available...
                </div>
            ) : (
                <> */}
                    <Sidebar />
                    <div className="w-full h-[100vh] overflow-hidden flex flex-col gap-1 justify-between items-start">
                        <main className="bg-900 w-full h-full overflow-y-scroll mb-20 xl:mb-0 xl:rounded-bl-md">
                            <Navigation />
                            <div className="mx-auto w-full max-w-[80rem] min-h-[80svh] p-2 md:p-2 lg:p-4 flex flex-col gap-2 xl:gap-4 items-between">
                                <MobileNavigation />
                                <Outlet />
                            </div>
                            <Footer />
                            <AddToHomeScreenBanner />
                        </main>
                        <PlayerUI audioRef={audioRef} />
                    </div>
                {/* </>
            )
        } */}
    </div>
}