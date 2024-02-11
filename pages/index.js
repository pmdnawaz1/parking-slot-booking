// pages/index.js

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCities } from '../utils/api';



const CityCard = ({ city }) => {
let dummyImageUrl;

switch (city.name) {
  case 'Madurai': 
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'krishnan kovil':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Coimbatore':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Chennai':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Hyderabad':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Delhi':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Mumbai':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Kolkata':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'banglore':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Pune':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Ahmedabad':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
  case 'Surat':
    dummyImageUrl = 'https://via.placeholder.com/150';
    break;
 case 'Jaipur':

  dummyImageUrl = 'https://via.placeholder.com/150';
  break;

  default:

}

  return (
    <div className="max-w-xs mx-2 my-4">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <img className="w-full h-40 object-cover" src={dummyImageUrl} alt={`City: ${city.name}`} />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{city.name}</h3>
          <Link className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" href={`/places/${city._id}`}>
       
              Explore Places
      
          </Link>
        </div>
      </div>
    </div>
  );
};


const Home = ({ city }) => {
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
        <div className="flex flex-wrap justify-center">
          {cities.map((city) => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
      </div>
    
  );
};

export default Home;
