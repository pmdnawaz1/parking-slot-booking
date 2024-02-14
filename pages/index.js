import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCities } from '../utils/api';
import { FaSearch } from 'react-icons/fa';

const CityCard = ({ city }) => {
	let dummyImageUrl;

	return (
		<div className="max-w-xs mx-2 my-4">
			<div className="bg-white rounded-lg overflow-hidden shadow-md">
				<img
					className="w-full h-40 object-cover"
					src={city.cityImage}
					alt={`City: ${city.name}`}
				/>
				<div className="p-4">
					<h3 className="text-xl font-bold mb-2">{city.name}</h3>
					<Link
						className="block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
						href={`/places/${city._id}`}
					>
						Explore Places
					</Link>
				</div>
			</div>
		</div>
	);
};

const Home = ({ city }) => {
	const [cities, setCities] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [userEmail, setUserEmail] = useState(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userEmail = localStorage.getItem('userEmail');
			setUserEmail(userEmail);
		}
	}, []);

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

	const filteredCities = cities.filter((city) => {
		return city.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	return !userEmail ? (
		<div className="container mx-auto my-10 text-center">
			<h1 className="text-4xl font-bold mb-4">
				Welcome to the Parking Slot Booking System
			</h1>
			<h2 className="text-lg mb-6">Please Sign in to continue</h2>
			<Link
				href="/signup"
				className="m-4 px-4 py-2 bg-black text-white rounded shadow-md"
			>
				Sign up
			</Link>
			<Link
				href="/login"
				className="m-4 px-4 py-2 bg-black text-white rounded shadow-md"
			>
				Log in
			</Link>
		</div>
	) : (
		<div className="container mx-auto my-10 text-center">
			<h1 className="text-4xl font-bold mb-4">
				Welcome to the Parking Slot Booking System
			</h1>
			<h2 className="text-lg mb-6">
				Select a city to find available places to park:
			</h2>
			<div className="flex items-center justify-center mb-4">
				<div className="relative">
					<input
						type="text"
						placeholder="Search cities"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="py-2 pl-10 pr-4 border-2 rounded-lg focus:outline-none focus:border-blue-500"
					/>
					<FaSearch className="absolute top-3 left-3 text-gray-500" />
				</div>
			</div>
			<div className="flex flex-wrap justify-center">
				{filteredCities.map((city) => (
					<CityCard key={city._id} city={city} />
				))}
			</div>
		</div>
	);
};

export default Home;
