import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSlotById, confirmBooking, sendMail } from '../../utils/api';
// import { ReactComponent as DoneIcon } from '../../assets/done.svg'; // Import SVG icon for success

const Booking = () => {
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [userId, setUserId] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id) {
			const getSlot = async () => {
				try {
					const slot = await fetchSlotById(id);
					setSelectedSlot(slot);
				} catch (error) {
					console.error('Error fetching slot:', error);
				}
			};
			getSlot();
		}
	}, [id]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedUserId = localStorage.getItem('userId');
			const storedUserEmail = localStorage.getItem('userEmail');
			if (storedUserId) {
				setUserId(storedUserId);
			}
			if (storedUserEmail) {
				setUserEmail(storedUserEmail);
			}
		}
	}, []);

	const handleConfirmBooking = async () => {
		try {
			await sendMail(userEmail);
			router.push(
				`/confirmation?userId=${userId}&slotId=${id}&email=${userEmail}`
			);
		} catch (error) {
			console.error('Error confirming booking:', error);
		}
	};

	return (
		<div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg m-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Booking Details</h1>
			<p className="text-gray-700 mb-4">
				Location: {selectedSlot?.placeId}
				<br />
				Status: {selectedSlot?.isBooked ? 'Booked' : 'Available'}
				<br />
				User Email: {selectedSlot?.isBooked ? 'N/A' : userEmail}
				<br />
				User ID: {selectedSlot?.isBooked ? 'N/A' : userId}
			</p>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleConfirmBooking}
			>
				Confirm
			</button>
		</div>
	);
};

export default Booking;
