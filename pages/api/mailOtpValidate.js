import dbConnect from '../../utils/dbConnect';
import OTP from '../../models/OTP';

export default async function handler(req, res) {
	const { email, otp } = req.body;
	console.log(email, otp);
	await dbConnect();
	try {
		// Find the OTP in the database
		const otpRecord = await OTP.findOne({ email, otp });
		console.log(otpRecord);

		if (!otpRecord) {
			return res.status(400).json({ success: false, error: 'Invalid OTP' });
		}

		// Check if the OTP is expired (e.g., if it's valid for only a certain duration)

		// Delete the OTP record from the database
		// await OTP.deleteOne({ _id: otpRecord._id });

		// You can perform additional actions here like allowing the user to proceed with some operation

		return res
			.status(200)
			.json({ success: true, message: 'OTP validated successfully' });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
}
