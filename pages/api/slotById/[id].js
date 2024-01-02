// pages/api/slotById.js
import dbConnect from '../../../utils/dbConnect';
import Slot from '../../../models/Slot';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      if (req.query.id) {
        // Fetch a specific slot by ID
        const slot = await Slot.findById(req.query.id);

        if (!slot) {
          res.status(404).json({ error: 'Slot not found' });
          return;
        }

        res.status(200).json({ slot });
      } else {
        // Fetch available slots from MongoDB
        const availableSlots = await Slot.find({ available: true });

        res.status(200).json({ slots: availableSlots });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
