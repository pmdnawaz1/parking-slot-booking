import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchAvailableSlots } from '../../utils/api';
import { setSlots } from '../../redux/slices/slotsSlice';
import { isAuthenticated } from '../../utils/auth';

export default function Home() {
	const dispatch = useDispatch();
	const availableSlots = useSelector((state) => state.slots);
	const router = useRouter();
	const placeId = router.query.place;

	useEffect(() => {
		const getAvailableSlots = async () => {
			if (placeId) {
				try {
					// Assume fetchAvailableSlots fetches data from your API
					const slots = await fetchAvailableSlots(placeId);
					dispatch(setSlots(slots));
				} catch (error) {
					console.error('Error fetching available slots:', error);
				}
			}
		};

		getAvailableSlots();
	}, [dispatch, placeId]);

	const handleSlotClick = (slot) => {
		if (!isAuthenticated()) {
			window.location.href = '/login';
			return;
		}
		if (slot.isBooked) {
			alert('This slot is not available.');
			return;
		}

		window.location.href = `/booking/${slot._id}`;
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-semibold mb-4">Available Parking Slots</h1>
			<div className="grid grid-cols-5 gap-4">
				{availableSlots?.map((slot, index) => (
					<div
						key={index}
						onClick={() => handleSlotClick(slot)}
						className={`p-4 border rounded-lg ${
							slot?.isBooked
								? 'bg-red-200'
								: 'bg-green-200 hover:bg-green-300'
						}`}
						style={{
							height: '150px',
							cursor: slot.isBooked ? 'not-allowed' : 'pointer',
						}}
					>
						<p className="text-lg font-semibold">{slot.location}</p>
						<p>{slot?.isBooked ? 'Booked' : 'Available'}</p>
					</div>
				))}
			</div>
		</div>
	);
}
