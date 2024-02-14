import dbConnect from '../../../utils/dbConnect';
import Place from '../../../models/Place';

const createPlace = async (req, res) => {
	try {
		if (req.method !== 'POST') {
			return res
				.status(405)
				.json({ success: false, error: 'Method Not Allowed' });
		}
		const { placeName, placeImage, cityId } = req.body;
		await dbConnect();

		const newPlace = await Place.create({
			name: placeName,
			placeImage: placeImage,
			cityId: cityId,
		});
		res.status(200).json({ success: true, Place: newPlace });
	} catch (error) {
		console.error('Error creating Place:', error);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

export default createPlace;
