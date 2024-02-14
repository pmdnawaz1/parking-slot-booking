import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPlaces } from '../../utils/api';
import { FaSearch } from 'react-icons/fa';

const PlaceCard = ({ place }) => {
	return (
		<li className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
			<Link className="block p-4" href={`/slots/${place._id}`}>
				<div
					className="w-full h-40 mb-2 bg-cover bg-center"
					style={{ backgroundImage: `url(${place.placeImage})` }}
				></div>
				<h2 className="text-xl font-bold mb-2">{place.name}</h2>
			</Link>
		</li>
	);
};

const Places = () => {
	const router = useRouter();
	const [places, setPlaces] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
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

	const filteredPlaces = places.filter((place) => {
		return place.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	return (
		<div className="container mx-auto my-10 text-center">
			<h1 className="text-4xl font-bold mb-6">Places to Park in {cityId}</h1>
			<div className="relative mb-4">
				<input
					type="text"
					placeholder="Search places"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="py-2 pl-10 pr-4 border-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
				/>
				<FaSearch className="absolute top-3 left-3 text-gray-500" />
			</div>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredPlaces.map((place) => (
					<PlaceCard key={place._id} place={place} />
				))}
			</ul>
		</div>
	);
};

export default Places;
