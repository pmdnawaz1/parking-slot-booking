import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
	const [cityName, setCityName] = useState('');
	const [cityImage, setCityImage] = useState('');
	const [cityResponse, setCityResponse] = useState(null);

	const [placeName, setPlaceName] = useState('');
	const [placeImage, setPlaceImage] = useState('');
	const [placeCity, setPlaceCity] = useState(null);
	const [placeResponse, setPlaceResponse] = useState(null);

	const [slotCityId, setSlotCityId] = useState(null);
	const [slotPlaceId, setSlotPlaceId] = useState(null);
	const [slotResponse, setSlotResponse] = useState(null);

	const handleCreateCity = async () => {
		try {
			const response = await axios.post('/api/admin/createCity', {
				cityName,
				cityImage,
			});
			setCityResponse(response.data);
		} catch (error) {
			console.error('Error creating city:', error);
		}
	};

	const handleCreatePlace = async () => {
		try {
			const response = await axios.post('/api/admin/createPlace', {
				placeName,
				placeImage,
				cityId: placeCity,
			});
			console.log(response.data);
			setPlaceResponse(response.data);
		} catch (error) {
			console.error('Error creating place:', error);
		}
	};

	const handleCreateTenSlots = async () => {
		try {
			const response = await axios.post('/api/admin/createTenSlots', {
				cityId: slotCityId,
				placeId: slotPlaceId,
			});
			setSlotResponse(response.data);
		} catch (error) {
			console.error('Error creating ten slots:', error);
		}
	};

	return (
		<div>
			<div className="m-2 p-2">
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={cityName}
					onChange={(e) => setCityName(e.target.value)}
					placeholder="City Name"
				/>
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={cityImage}
					onChange={(e) => setCityImage(e.target.value)}
					placeholder="City Image"
				/>
				<button
					className="m-2 p-2 rounded bg-blue-500 text-white"
					onClick={handleCreateCity}
				>
					Create City
				</button>
				{cityResponse && <div>{JSON.stringify(cityResponse)}</div>}
			</div>

			<div className="m-2 p-2">
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={placeName}
					onChange={(e) => setPlaceName(e.target.value)}
					placeholder="Place Name"
				/>
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={placeImage}
					onChange={(e) => setPlaceImage(e.target.value)}
					placeholder="Place Image"
				/>
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={placeCity}
					onChange={(e) => setPlaceCity(e.target.value)}
					placeholder="Place City Id"
				/>
				<button
					className="m-2 p-2 rounded bg-blue-500 text-white"
					onClick={handleCreatePlace}
				>
					Create Place
				</button>
				{placeResponse && <div>{JSON.stringify(placeResponse)}</div>}
			</div>

			<div className="m-2 p-2">
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={slotCityId}
					onChange={(e) => setSlotCityId(e.target.value)}
					placeholder="City Id"
				/>
				<input
					className="m-2 p-2 rounded"
					type="text"
					value={slotPlaceId}
					onChange={(e) => setSlotPlaceId(e.target.value)}
					placeholder="Place Id"
				/>
				<button
					className="m-2 p-2 rounded bg-blue-500 text-white"
					onClick={handleCreateTenSlots}
				>
					Create Ten Slots
				</button>
				{slotResponse && <div>{JSON.stringify(slotResponse)}</div>}
			</div>
		</div>
	);
};

export default Dashboard;
