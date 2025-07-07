import { useEffect, useState } from "react";
import { getCredentials, type Credentials } from "../lib/credentials";
import { Navigate, useLocation } from "react-router-dom"; // Use useLocation to check current route
import { CLIENT, VERSION } from "../pages/Home";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState<boolean | null | undefined>(undefined);
    const location = useLocation();

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const creds: Credentials = (await getCredentials() as unknown) as Credentials;

                if (!creds) {
                    setAuthenticated(false);
                    return;
                }

                // Check if credentials are valid by pinging the server
                const res = await fetch(`${creds.url}/rest/ping?u=${creds.username}&t=${creds.token}&s=${creds.salt}&c=${CLIENT}&v=${VERSION}&f=${'json'}`);

                if (res.ok) {
                    const data = await res.json();
                    if (data['subsonic-response'].status !== 'ok' || data['subsonic-response'].openSubsonic === false) {
                        setAuthenticated(false);
                    } else {
                        setAuthenticated(true);
                    }
                } else {
                    setAuthenticated(false);
                }
            } catch {
                setAuthenticated(false);
            }
        };

        fetchAuth();
    }, []);

    useEffect(() => {
        const checkAuthentication = () => {
            if (authenticated === false && location.pathname !== '/auth') {
                // If not authenticated and not already on /auth, redirect to /auth
                return <Navigate to='/auth' replace />;
            }
        }
        checkAuthentication();
    }, [authenticated, location.pathname]);

    return { authenticated }; // If authenticated or checking, return the state
}
