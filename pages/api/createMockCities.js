import dbConnect from '../../utils/dbConnect';
import City from '../../models/City';

const createMockCities = async (req, res) => {
  try {

    await dbConnect();

    // Create mock cities
    const mockCities = [
      { name: 'City 1' },
      { name: 'City 2' },
      { name: 'City 3' },
      // Add more cities as needed
    ];

    // Insert the cities into the database
    const createdCities = await City.insertMany(mockCities);

    res.status(200).json({ success: true, cities: createdCities });
  } catch (error) {
    console.error('Error creating mock cities:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default createMockCities;    
