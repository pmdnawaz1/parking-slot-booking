import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPlaces } from '../../utils/api';

const PlaceCard = ({ place }) => {
  // Dummy image URL, replace it with actual image URLs
  const dummyImageUrl = 'https://via.placeholder.com/500';

  return (
    <li className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
      <Link  className="block p-4" href={`/slots/${place._id}`}>
       
          <div className="w-full h-40 mb-2 bg-cover bg-center" style={{ backgroundImage: `url(${dummyImageUrl})` }}></div>
          <h2 className="text-xl font-bold mb-2">{place.name}</h2>
 
      </Link>
    </li>
  );
};

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
          <PlaceCard key={place._id} place={place} />
        ))}
      </ul>
    </div>
  );
};

export default Places;
