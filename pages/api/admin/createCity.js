import dbConnect from '../../../utils/dbConnect';
import City from '../../..//models/City';

const createCity = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
    const { cityName, cityImage} = req.body;
    await dbConnect();

    const newCity = await City.create({
      name: cityName,
      cityImage: cityImage
    });

    res.status(200).json({ success: true, city: newCity });
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default createCity;
