import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'GET') {
		try {
			// Fetch all slots from MongoDB
			const slots = await Slot.find({ placeId: req.query.placeId });

			res.status(200).json({ slots });
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	} else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}
