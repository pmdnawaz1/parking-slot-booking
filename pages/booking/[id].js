import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSlotById, confirmBooking } from '../../utils/api';
// import { ReactComponent as DoneIcon } from '../../assets/done.svg'; // Import SVG icon for success

const Booking = () => {
	const availableSlots = useSelector((state) => state.slots);
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [userId, setUserId] = useState(null);
	const [otp, setOtp] = useState('');
	const [otpExpired, setOtpExpired] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const userId2 = useSelector((state) => state.auth.userId);
	console.log('userId2', userId2);
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
			const storedUserId = localStorage.getItem('user');
			setUserId(storedUserId);
		}
	}, []);

	const handleConfirmBooking = async () => {
		try {
			const confirmation = await confirmBooking(id, userId, otp);

			if (confirmation.success) {
				router.push(`/confirm`);
			} else {
				console.error('Booking confirmation failed:', confirmation.error);
			}
		} catch (error) {
			console.error('Error confirming booking:', error);
		}
	};

	const handleOtpChange = (event) => {
		setOtp(event.target.value);
	};

	const handleResendOtp = () => {
		// Add logic to resend OTP
	};

	return (
		<div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg m-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Booking Details</h1>
			<p className="text-gray-700 mb-4">
				Location: {selectedSlot?.placeId}
				<br />
				Status: {selectedSlot?.isBooked ? 'Available' : 'Booked'}
				<br />
				User: {selectedSlot?.isBooked ? 'N/A' : userId}
			</p>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Enter OTP:</label>
				<input
					value={otp}
					onChange={handleOtpChange}
					type="text"
					placeholder="Enter OTP"
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
				/>
				{otpExpired && (
					<p className="text-red-500 text-sm mt-2">
						OTP expired. Please request a new one.
					</p>
				)}
			</div>
			<div className="flex justify-between items-center">
				<button
					onClick={handleResendOtp}
					className="text-sm text-gray-500 shadow-lg px-4 py-4 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
				>
					Resend OTP
				</button>
				<button
					onClick={handleConfirmBooking}
					className="bg-black hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-4 focus:outline-none"
				>
					Confirm Booking
				</button>
			</div>
		</div>
	);
};

export default Booking;
