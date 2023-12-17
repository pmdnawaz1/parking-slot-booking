// pages/api/slots.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export const fetchSlotById = async (id) => {
  await dbConnect();
  console.log("1")
  try {
    // Fetch a slot by ID from MongoDB
    const slot = await Slot.findById(id);

    return slot;
  } catch (error) {
    throw new Error('Error fetching slot by ID');
  }
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch available slots from MongoDB
      const availableSlots = await Slot.find({ available: true });

      res.status(200).json({ slots: availableSlots });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
