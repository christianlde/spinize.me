import { useEffect, useState, useCallback } from 'react';
import { getCredentials, type Credentials } from '../lib/credentials';
import { CLIENT, VERSION } from '../pages/Home';
import axios from 'axios';
import type { Song } from '../types/Song';
import type { Album } from '../types/Album';
import type { Artist } from '../types/Artist';
import { getSongAll } from '../lib/songDB';
import { getCoverArtAll } from '../lib/coverArtDB';

export function useDownloads() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [covers, setCovers] = useState<Blob[]>([]);

  // Fetch data for songs, albums, and artists
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all songs and covers
      const songsRes = await getSongAll();
      const coverRes = await getCoverArtAll();

      // Set songs and covers
      setSongs(songsRes);
      setCovers(coverRes);

      // Extract albums and artists from songs
      const uniqueAlbums = Array.from(new Set(songsRes.map((song) => song.albumId)));
      const uniqueArtists = Array.from(new Set(songsRes.map((song) => song.artistId)));

      // Assuming we have a function `getAlbumById` and `getArtistById` to fetch album and artist details
      const albumDetails = await Promise.all(
        uniqueAlbums.map((albumId) => getAlbumById(albumId))
      );
      const artistDetails = await Promise.all(
        uniqueArtists.map((artistId) => getArtistById(artistId))
      );

      setAlbums(albumDetails);
      setArtists(artistDetails);
    } catch {
      // setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch of data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Download the song by its ID
  const downloadSong = async (songId: string) => {
    setLoading(true);
    setError(null);

    try {
      const creds = (await getCredentials()) as Credentials;
      const downloadUrl = `${creds.url}/rest/download?u=${creds.username}&t=${creds.token}&s=${creds.salt}&c=${CLIENT}&v=${VERSION}&id=${songId}`;

      // Fetch the song as a Blob
      const response = await axios.get(downloadUrl, { responseType: 'blob' });

      // Create a URL for the Blob and trigger the download
      const blob = response.data;
      const blobUrl = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${songId}.mp3`; // You can customize this based on song metadata
      a.click();

      // Revoke the blob URL after download
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // setError(err.message || 'An error occurred while downloading the song');
    } finally {
      setLoading(false);
    }
  };

  return { songs, albums, artists, covers, loading, error, refresh: fetchData, downloadSong };
}

// Example helper functions to get album and artist details
const getAlbumById = async (albumId: string): Promise<Album> => {
  // Mock API call or fetch the album details based on albumId
  // This should return an album object with all the details
  return { id: albumId, name: 'Album Name', artist: 'Artist Name' };
};

const getArtistById = async (artistId: string): Promise<Artist> => {
  // Mock API call or fetch the artist details based on artistId
  // This should return an artist object with all the details
  return { id: artistId, name: 'Artist Name' };
};
