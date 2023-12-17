// pages/api/confirm.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { slotId } = req.body;

    try {
      // Find the booked slot in MongoDB
      const bookedSlot = await Slot.findOne({ _id: slotId, available: false });

      if (!bookedSlot) {
        return res.status(400).json({ message: 'Invalid or unbooked slot' });
      }

      res.status(200).json({ message: 'Booking confirmed', confirmedSlot: bookedSlot });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
