import dbConnect from '../../../utils/dbConnect';
import Slot from '../../../models/Slot';

const createTenSlots = async (req, res) => {
	try {
		// Connect to the database
		await dbConnect();
		const { cityId, placeId } = req.body;

		let newSlot;
		// Create 10 slots
		for (let i = 1; i <= 10; i++) {
			newSlot = await Slot.create({
				slotNumber: i,
				cityId,
				placeId,
			});
		}

		// Send response and log success message
		res.status(200).json({ success: true, messege: 'Ten slots created' });
		console.log('Ten slots created');
	} catch (error) {
		console.error('Error creating ten slots:', error);
		res.status(500).send({ message: 'Error creating ten slots' });
	}
};

export default createTenSlots;
