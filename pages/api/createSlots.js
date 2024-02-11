import mongoose from 'mongoose';
import dbConnect from '../../utils/dbConnect';
import City from '../../models/City';
import Place from '../../models/Place';
import Slot from '../../models/Slot';
const createInitialData = async (req, res) => {
	try {
		// Connect to the database
		await dbConnect();

		// Create 10 cities
		const cities = [];
		for (let i = 1; i <= 5; i++) {
			const city = await City.create({ name: `City ${i}` });
			cities.push(city);
			// For each city, create 10 places
			for (let j = 1; j <= 10; j++) {
				const place = await Place.create({
					name: `Place ${j} in ${city.name}`,
					cityId: city._id,
				});

				for (let i = 1; i <= 10; i++) {
					const slot = await Slot.create({
						slotNumber: i,
						cityId: city._id,
						placeId: place._id,
						available: true,
					});
				}
			}
		}

		// Close the database connection
		await mongoose.connection.close();

		// Send response and log success message
		res.send({ message: 'Initial data creation successful' });
		console.log('Initial data creation successful');
	} catch (error) {
		console.error('Error creating initial data:', error);
		res.status(500).send({ message: 'Error creating initial data' });
	}
};

// Run the function to create initial data
export default createInitialData;
