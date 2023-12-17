// pages/api/bookings.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { slotId, userId } = req.body;

    try {
      // Find the selected slot in MongoDB
      const selectedSlot = await Slot.findOne({ _id: slotId, available: true });

      if (!selectedSlot) {
        return res.status(400).json({ message: 'Invalid slot or slot already booked' });
      }

      // Update the slot's availability status
      selectedSlot.available = false;
      selectedSlot.userId = userId;

      // Save the updated slot in MongoDB
      await selectedSlot.save();

      res.status(200).json({ message: 'Booking successful', bookedSlot: selectedSlot });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
