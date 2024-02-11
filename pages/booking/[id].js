import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch and useSelector
import { fetchSlotById, confirmBooking } from '../../utils/api';

const Booking = () => {
	const availableSlots = useSelector((state) => state.slots);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [userId, setUserId] = useState(null); 
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	console.log(userId, 'booking');

	useEffect(() => {
		// Ensure that id is defined before attempting to fetch the slot
		if (id) {
			const getSlot = async () => {
				try {
					const slot = await fetchSlotById(id);
					setSelectedSlot(slot);
				} catch (error) {
					// Handle error
					console.error('Error fetching slot:', error);
				}
			};

			getSlot();
		}
	}, [id]);
  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);
	const handleConfirmBooking = async () => {
		try {
			// Confirm the booking with the userId obtained from Redux state
			const confirmation = await confirmBooking(id, userId);

			// Handle confirmation result
			if (confirmation.success) {
				router.push(`/confirm`);
			} else {
				console.error('Booking confirmation failed:', confirmation.error);
			}
		} catch (error) {
			console.error('Error confirming booking:', error);
		}
	};

	if (!selectedSlot) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Booking Details</h1>
			<p className="text-black-700 dark:text-black-200">
				Location: {selectedSlot.location}
				<br />
				Status: {selectedSlot.isBooked ? 'Available' : 'Booked'}
				<br />
				User: {selectedSlot.isBooked ? 'N/A' : userId}
			</p>
			<button
				onClick={handleConfirmBooking}
				className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 text-white font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full"
			>
				Confirm Booking
			</button>
		</div>
	);
};

export default Booking;
