// pages/api/cities.js

import dbConnect from '../../utils/dbConnect';
// import Slot from '../../models/City';
import City from '../../models/City';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch unique cities from MongoDB
      const cities = await City.find();

      res.status(200).json({ cities });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
