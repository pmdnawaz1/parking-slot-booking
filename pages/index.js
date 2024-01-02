// pages/index.js

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCities } from '../utils/api';

const Home = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    getCities();
  }, []);

  return (
    <div className="container mx-auto my-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Parking Slot Booking System</h1>
      <h2 className="text-lg mb-6">Select a city to find available places to park:</h2>
      <ul className="flex flex-wrap justify-center">
        {cities.map((city) => (
          <li key={city._id} className="m-2">
            <Link className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" href={`/places/${city._id}`}>
                {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
