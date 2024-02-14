import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export default async function handler(req, res) {
	const { slotId, userId } = req.body;

	await dbConnect();
	try {

		const updatedSlot = await Slot.findByIdAndUpdate(slotId, {
			isBooked: "true",
			userId,
		});

		if (!updatedSlot) {
			return res
				.status(404)
				.json({ success: false, message: 'Slot not found' });
		}

		return res.status(200).json({ success: true, data: updatedSlot });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
}
