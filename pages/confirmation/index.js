import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { confirmBooking, validateOtp } from '../../utils/api';

const Confirmation = () => {
	const router = useRouter();
	const { userId, slotId, email } = router.query;
	const [confirmedSlot, setConfirmedSlot] = useState(null);

	const [otp, setOtp] = useState('');
	const [otpExpired, setOtpExpired] = useState(false);

	const handleConfirmBooking = async () => {
		try {
			const otpResponse = await validateOtp(email, otp);

			if (!otpResponse) {
				alert('Invalid OTP');
				throw new Error('Failed to validate OTP');
			}
			if (otpResponse) {
				const confirmation = await confirmBooking(slotId, userId);

				if (confirmation.success) {
					router.push(`/success`);
				} else {
					console.error('Booking confirmation failed:', confirmation.error);
				}
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
		<div className="w-1/2 m-8 p-4 mx-auto">
			<h1 className="text-2xl font-bold mb-4">Confirmation</h1>
			<p>Slot ID: {slotId}</p>
			<p>User ID: {userId}</p>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Enter OTP:</label>
				<input
					value={otp}
					onChange={handleOtpChange}
					type="text"
					placeholder="Enter OTP"
					className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
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

export default Confirmation;
