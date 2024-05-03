import { useState } from 'react';
import { useRouter } from 'next/router';
import { unbookSlot, sendMail, validateOtp } from '../../utils/api';

const UnbookSlot = () => {
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [otpSent, setOtpSent] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleOtpChange = (event) => {
		setOtp(event.target.value);
	};

	const handleSendOtp = async () => {
		try {
			await sendMail(email);
			setOtpSent(true);
		} catch (error) {
			setError(error.message);
		}
	};

	const handleUnbookSlot = async () => {
		try {
			await validateOtp(email, otp);
			const response = await unbookSlot(email, otp);
			// Display success alert
			console.log(response);
			if (response.status === 200) {
				alert('Slot unbooked successfully');
			}

			router.push('/unbook'); // Redirect to success page after unbooking
		} catch (error) {
			// Display error alert
			alert(`Error unbooking slot: ${error.message}`);
			console.error('Error unbooking slot:', error);
		}
	};

	return (
		<div className="container mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
			<h1 className="text-3xl font-bold mb-6">Unbook Slot</h1>
			{error && <p className="text-red-600 mb-4">{error}</p>}
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Email:</label>
				<input
					value={email}
					onChange={handleEmailChange}
					type="email"
					placeholder="Enter your email"
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
				/>
			</div>
			{!otpSent && (
				<button
					onClick={handleSendOtp}
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2"
				>
					Send OTP
				</button>
			)}
			{otpSent && (
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">OTP:</label>
					<input
						value={otp}
						onChange={handleOtpChange}
						type="text"
						placeholder="Enter OTP"
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
					/>
				</div>
			)}
			{otpSent && (
				<button
					onClick={handleUnbookSlot}
					className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2"
				>
					Unbook Slot
				</button>
			)}
		</div>
	);
};

export default UnbookSlot;
