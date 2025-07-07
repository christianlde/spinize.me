import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { clearCredentials } from '../lib/credentials';

export default function LogOut() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Use the useNavigate hook for navigation
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Save credentials in IndexedDB
      await clearCredentials();

      setMessage('Credentials deleted successfully!');
      setIsConnected(false); // Simulate a successful connection
      // Navigate to the app
      navigate('/app');
    } catch (error) {
      console.error('Error deleting credentials:', error);
      setMessage('Error deleting credentials.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <>
      <Link to='/app' className='w-fit'>
        Go to the app
      </Link>

      <div className='flex flex-row gap-4 justify-between items-center'>
        <h1 className='text-xl'>Disconnect</h1>
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
        className='flex flex-col gap-3 p-2 rounded-md bg-white text-black'
      >
        <button
          type='submit'
          disabled={loading}
          className='mt-4 p-2 rounded-md bg-violet-600 border-2 border-violet-600 focus:outline-4 outline-violet-800 uppercase text-white tracking-wider'
        >
          {loading ? 'Disconnecting...' : 'Disconnect'}
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
