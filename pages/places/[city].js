// pages/places/[city].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../../utils/api';
import Link from 'next/link';

const Places = () => {
  const router = useRouter();
  const [places, setPlaces] = useState([]);
  const cityId = router.query.city;

  useEffect(() => {
    const getPlaces = async () => {
      if (cityId) {
        try {
          const data = await fetchPlaces(cityId);
          setPlaces(data.places);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      }
    };

    getPlaces();
  }, [cityId]);

  return (
    <div className="container mx-auto my-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Places to Park in {cityId}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places?.map((place) => (
          <li key={place._id} className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
            <Link className="block p-4" href={`/slots/${place._id}`}>

                <h2 className="text-xl font-bold mb-2">{place.name}</h2>
                
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;
