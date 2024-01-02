// pages/api/places/[city].js

import dbConnect from '../../../utils/dbConnect';
import Place from '../../../models/Place';

export default async function handler(req, res) {
  await dbConnect();

  const { city } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch places for the specified city from MongoDB
      const places = await Place.find({ cityId: city });

      res.status(200).json({ places });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
