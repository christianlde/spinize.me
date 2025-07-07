import { useEffect, useState } from 'react';
import { faRadio } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RadioCard from '../components/cards/RadioCard';
import RadioCardSkeleton from '../components/cards/RadioCardSkeletton';

interface RadioStation {
  name: string;
  url_resolved: string;
  favicon: string;
  homepage: string;
  country: string;
  tags: string;
}

export default function Radio() {
  const [stations, setStations] = useState<RadioStation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const radio_url = 'https://de1.api.radio-browser.info';

  useEffect(() => {
    fetch(`${radio_url}/json/stations/topclick/20`)
      .then(res => res.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch(() => {
        setStations([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="z-[2] mb-4 flex flex-col gap-2 justify-center items-start text-2xl font-semibold">
        <p><FontAwesomeIcon icon={faRadio} /> Public Radio Stations</p>
        <small>Radio fetching api : <span className='text-golden'>{radio_url}</span></small>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <RadioCardSkeleton key={i} />)
          : stations?.map((station, i) => (
              <RadioCard key={i} station={station} />
            ))}
        {!loading && stations?.length === 0 && (
          <p className="text-gray-500 italic col-span-full">No radio stations available.</p>
        )}
      </div>
    </div>
  );
}
