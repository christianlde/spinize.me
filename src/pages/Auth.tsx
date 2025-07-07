import { useState } from "react";
import { saveCredentials } from '../lib/credentials'; // Import the helper
import { MD5 } from 'crypto-js';  // Import MD5 from crypto-js
import { Link, useNavigate } from 'react-router-dom';
import { generateSalt } from "../utils/generateSalt";
import { normalizeUrl } from "../utils/normalizeUrl";
// import useAuth from "../hooks/useAuth";

export default function Auth() {
  const [serverUrl, setServerUrl] = useState('https://');
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const { authencitated } = useAuth();
  // const [isConnected, setIsConnected] = useState(authencitated);
  const [isConnected, setIsConnected] = useState(false);

  // Use the useNavigate hook for navigation
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const salt = generateSalt(); // Generate salt
      const token = MD5(password + salt).toString(); // Generate token (hash)

      const normalizedUrl = normalizeUrl(serverUrl); // Normalize the URL

      // Save credentials in IndexedDB
      await saveCredentials({
        url: normalizedUrl,
        username,
        token,
        salt,
      });

      setMessage('Credentials saved successfully!');
      setIsConnected(true); // Simulate a successful connection
      // Navigate to the homepage
      navigate('/app');
    } catch (error) {
      console.error('Error saving credentials:', error);
      setMessage('Error saving credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to='/app' className='w-fit'>
        Go to the app
      </Link>

      <div className='flex flex-row gap-4 py-4 justify-between items-center'>
        <p>
          Status:{' '}
          {loading ? (
            <span>loading...</span>
          ) : isConnected ? (
            <span className='text-green-400'>connected</span>
          ) : (
            <span className='text-red-400'>disconnected</span>
          )}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-3 p-2 md:p-4 rounded-md border-2 border-color-600 text-black'
      >
        <label htmlFor='serverUrl' className='text-700 font-semibold'>
          Server URL - <i>ex: https://mysubsonicserver.ext - note: use the http:// or https:// in from of your server IP or domain name</i>
        </label>
        <input
          className='p-2 rounded-md border-2 border-color-600 focus:outline-4 outline-color-800 bg-black text-white'
          type='text'
          id='serverUrl'
          placeholder='Server URL'
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          required
        />

        <label htmlFor='username' className='text-700 font-semibold'>
          Username - <i>ex: johndoe - note: no spaces</i>
        </label>
        <input
          className='p-2 rounded-md border-2 border-color-600 focus:outline-4 outline-color-800 bg-black text-white'
          type='text'
          id='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor='password' className='text-700 font-semibold'>
          Password - <i>the password will be hashed and the hash will be used with the salt for subsonic authencitation</i>
        </label>
        <input
          className='p-2 rounded-md border-2 border-color-600 focus:outline-4 outline-color-800 bg-black text-white'
          type='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          disabled={loading}
          className='mt-4 p-2 rounded-md bg-600 border-2 border-color-600 focus:outline-4 outline-color-800 uppercase text-white tracking-wider'
        >
          {loading ? 'Connecting...' : 'Connect'}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: '1rem',
            fontWeight: 'bold',
            color: message === 'Credentials saved successfully!' ? 'green' : 'red',
            whiteSpace: 'pre-wrap',
          }}
        >
          {message}
        </p>
      )}
    </>
  );
}
