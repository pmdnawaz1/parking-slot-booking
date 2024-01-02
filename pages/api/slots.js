// pages/api/slots.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export const fetchSlotById = async (placeId) => {
  await dbConnect();

  try {
    // Fetch a slot by ID from MongoDB
    const slot = await Slot.find(placeId);

    return slot;
  } catch (error) {
    throw new Error('Error fetching slot by ID');
  }
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const placeId = req.query.placeId
    
    try {
      // Fetch available slots from MongoDB
      const availableSlots = await Slot.find({ placeId});

      res.status(200).json({ slots: availableSlots });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
