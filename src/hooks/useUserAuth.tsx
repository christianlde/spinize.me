import { useEffect, useState } from "react";
import { getCredentials, type Credentials } from "../lib/credentials";
import { CLIENT, VERSION } from "../pages/Home";

export default function useUserAuth() {
    const [username, setUsername] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const creds: Credentials = (await getCredentials() as unknown) as Credentials;

                if (!creds) {
                    setAuthenticated(false);
                    return;
                }

                setUsername(creds.username);
                setUrl(creds.url);

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

    return { authenticated, username, url }; // If authenticated or checking, return the state
}
