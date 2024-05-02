// pages/api/unbookSlot.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';
import User from '../../models/User';
import { validateOtp } from '../../utils/api';
const unbookSlot = async (req, res) => {
	try {
		// Connect to the database
		await dbConnect();

		const { email, otp } = req.body;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// // Verify OTP
		// const otpIsValid = await validateOtp(email, otp);
		// if (!otpIsValid) {
		// 	return res.status(400).json({ error: 'Invalid OTP' });
		// }

		// Find slot booked by the user
		const slot = await Slot.findOne({ userId: user._id });
		console.log(slot, 'slot', user._id);
		if (!slot) {
			return res.status(404).json({ error: 'No slot booked by the user' });
		}

		// Unbook the slot
		await Slot.findByIdAndUpdate(slot._id, {
			isBooked: false,
			bookedBy: null,
			bookingTime: null,
		});

		res
			.status(200)
			.json({ success: true, message: 'Slot unbooked successfully' });
	} catch (error) {
		console.error('Error unbooking slot:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default unbookSlot;
