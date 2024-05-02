import dbConnect from '../../utils/dbConnect';
import nodemailer from 'nodemailer';
import OTP from '../../models/OTP';

// Function to generate a random OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000);
}

export default async function handler(req, res) {
	const { userEmail } = req.body;

	await dbConnect();
	try {
		// Generate OTP
		const otpValue = generateOTP();

		// Save OTP in the database
		const otp = new OTP({
			email: userEmail,
			otp: otpValue,
			createdAt: new Date(),
		});
		await otp.save();

		// Send email with OTP to the user
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'lokeshgangineni1329@gmail.com', // Your email address
				pass: 'tehz jkai kglr qwyq', // Your email password
			},
		});

		const mailOptions = {
			from: 'lokeshgangineni1329@gmail.com',
			to: userEmail,
			subject: 'Slot Booking OTP',
			text: `Dear ${userEmail},\n\nYour OTP  is: ${otpValue}\n\nRegards,\nThe App Team`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		return res.status(200).json({ success: true, data: null });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
}
