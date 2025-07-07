import { useEffect, useState, type ReactNode } from 'react';
import type { Song } from '../types/Song';
import { SongPlayerContext } from './SongPlayerContext';
import { setMediaSessionMetadata } from '../utils/setMediaSessionMetadata';
import { useCoverArt } from '../hooks/useCoverArt';

export interface SongPlayerContextProps {
  currentSong: Song | null;
  queue: Song[];
  shuffle: boolean;
  reload: boolean;
  repeat: number;
  infiniteLoop: boolean;
  live: boolean;
  paused: boolean;
  handleSongClick: (song: Song) => void;
  handlePlaylistClick: (playlist: Song[], shuffle: boolean) => void;
  playNextSong: () => void;
  unsetSong: () => void;
  playPrevSong: () => void;
  addToQueue: (song: Song) => void;
  addPlaylistToQueue: (playlist: Song[]) => void;
  removeFromQueue: (song: Song) => void;
  setQueue: React.Dispatch<React.SetStateAction<Song[]>>;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  clearQueue: () => void;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setRepeat: React.Dispatch<React.SetStateAction<number>>;
  replaySong: () => void;
  setInfiniteLoop: React.Dispatch<React.SetStateAction<boolean>>;
  setLive: React.Dispatch<React.SetStateAction<boolean>>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SongPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>([]);
  const [live, setLive] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [playHistory, setPlayHistory] = useState<Song[]>([]);
  const [forwardStack, setForwardStack] = useState<Song[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<number>(0); // 0: noRepeat 1: repeatList 2: repeatSong
  const [infiniteLoop, setInfiniteLoop] = useState<boolean>(false); // Used to handle : Auto Songs when the last song from the queue or forwardStack has been played.

  const handleSongClick = (song: Song) => {
    // If the clicked song is already the current song, don't stack
    if (currentSong?.id === song.id) {
      console.log('Song already playing:', song.title);
      return;
    }

    if (currentSong) {
      setPlayHistory(prev => [...prev, currentSong]);
    }

    setCurrentSong(song);
    setPaused(false);
    setForwardStack([]); // Clear forward stack on manual song click
    console.log('Playing song:', song.title);
  };

  const handlePlaylistClick = (playlist: Song[], shuffle: boolean) => {
    console.log('Playing playlist:', playlist.map(song => song.title).join(', '));
    setQueue(playlist);
    setShuffle(shuffle);
    setPlayHistory([]); // Reset history on new playlist
    setForwardStack([]);
    setCurrentSong(playlist[0]); // Start with the first song in the playlist
    setPaused(false);
  };

  const unsetSong = () => {
    setCurrentSong(null);
    setPaused(true);
    setLive(false);        // Stop any live stream flags
    setReload(true);       // Signal to audio player to reload (and thus stop)
  };

  const playNextSong = () => {
    if (forwardStack.length > 0) {
      const nextSong = forwardStack[forwardStack.length - 1];
      setForwardStack(prev => prev.slice(0, -1));
      if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
      setCurrentSong(nextSong);
      setPaused(false);
      return;
    }

    if (queue.length === 0) {
      if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
      setCurrentSong(null);
      setPaused(true);
      return;
    }

    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const nextSong = queue[randomIndex];

      setQueue(prevQueue => {
        const newQueue = [...prevQueue];
        newQueue.splice(randomIndex, 1);
        return newQueue;
      });

      if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
      setCurrentSong(nextSong);
      setPaused(false);
    } else {
      const nextSong = queue[0];
      if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
      setCurrentSong(nextSong);
      setPaused(false);
      setQueue(prev => prev.slice(1));
    }
  };

  const playPrevSong = () => {
    if (playHistory.length === 0) return;

    const prevSong = playHistory[playHistory.length - 1];
    setPlayHistory(prev => prev.slice(0, -1));

    if (currentSong) {
      setForwardStack(prev => [...prev, currentSong]);
    }

    setCurrentSong(prevSong);
    setPaused(false);
  };

  const replaySong = () => {
    setCurrentSong(currentSong);
    setPaused(false);
  };

  const addToQueue = (song: Song) => {
    // Check if the song is already in the queue
    const isSongInQueue = queue.some((queuedSong) => 
      queuedSong.id === song.id || (queuedSong.title === song.title && queuedSong.artist === song.artist)
    );
  
    if (!isSongInQueue) {
      if (currentSong == null) {
        setCurrentSong(song);
        setPaused(false);
        console.log('No song currently playing so started to play:', song.title);
      } else {
        setQueue(prev => [...prev, song]);
        console.log('Added to queue:', song.title);
      }
    } else {
      console.log('Song is already in the queue:', song.title);
    }
  };

  const addPlaylistToQueue = (playlist: Song[]) => {
    for (const song of playlist) {
        // Check if the song is already in the queue
        const isSongInQueue = queue.some((queuedSong) => 
          queuedSong.id === song.id || (queuedSong.title === song.title && queuedSong.artist === song.artist)
      );
      
      if (!isSongInQueue) {
        if (currentSong == null) {
          setCurrentSong(song);
          setPaused(false);
          console.log('No song currently playing so started to play:', song.title);
        } else {
          setQueue(prev => [...prev, song]);
          console.log('Added to queue:', song.title);
        }
      } else {
        console.log('Song is already in the queue:', song.title);
      }
    }
  };
  
  const removeFromQueue = (song: Song) => {
    setQueue(prevQueue =>
      prevQueue.filter(
        queuedSong =>
          !(queuedSong.id === song.id || (queuedSong.title === song.title && queuedSong.artist === song.artist))
      )
    );
    console.log('Removed from queue:', song.title);
  };  

  const clearQueue = () => {
    setQueue([]);
    console.log('Queue cleared');
  }

  const { cover } = useCoverArt(currentSong?.id);

  // Update Media Session metadata whenever currentSong changes
  useEffect(() => {
    if (currentSong) {
      setMediaSessionMetadata(currentSong, currentSong.url ? currentSong.url : cover);
    }

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        setPaused(false);
        setReload(false); // or your custom play logic
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        setPaused(true);
        setReload(true); // or your custom pause logic
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (forwardStack.length > 0) {
          const nextSong = forwardStack[forwardStack.length - 1];
          setForwardStack(prev => prev.slice(0, -1));
          if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
          setCurrentSong(nextSong);
          return;
        }

        if (queue.length === 0) {
          if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
          setCurrentSong(null);
          setPaused(true);
          return;
        }

        if (shuffle) {
          const randomIndex = Math.floor(Math.random() * queue.length);
          const nextSong = queue[randomIndex];

          setQueue(prevQueue => {
            const newQueue = [...prevQueue];
            newQueue.splice(randomIndex, 1);
            return newQueue;
          });

          if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
          setCurrentSong(nextSong);
          setPaused(false);
        } else {
          const nextSong = queue[0];
          if (currentSong) setPlayHistory(prev => [...prev, currentSong]);
          setCurrentSong(nextSong);
          setPaused(false);
          setQueue(prev => prev.slice(1));
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (playHistory.length === 0) return;

        const prevSong = playHistory[playHistory.length - 1];
        setPlayHistory(prev => prev.slice(0, -1));

        if (currentSong) {
          setForwardStack(prev => [...prev, currentSong]);
        }

        setCurrentSong(prevSong);
        setPaused(false);
      });
    }
  }, [currentSong, queue, shuffle, playHistory, forwardStack, cover]);

  return (
    <SongPlayerContext.Provider
      value={{
        currentSong,
        queue,
        setQueue,
        shuffle,
        setShuffle,
        reload,
        setReload,
        repeat,
        setRepeat,
        infiniteLoop,
        setInfiniteLoop,
        live,
        setLive,
        paused,
        setPaused,
        handleSongClick,
        handlePlaylistClick,
        playNextSong,
        playPrevSong,
        addToQueue,
        addPlaylistToQueue,
        removeFromQueue,
        clearQueue,
        replaySong,
        unsetSong,
      }}
    >
      {children}
    </SongPlayerContext.Provider>
  );
};

