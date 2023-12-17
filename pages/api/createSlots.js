// pages/api/createInitialSlots.js

import dbConnect from '../../utils/dbConnect';;
import Slot from '../../models/Slot';

const createInitialSlots = async (req, res) => {
  try {
    // Connect to the database
    await dbConnect()

    // Create 10 initial slots
    const initialSlots = Array.from({ length: 10 }, (_, index) => ({
      location: `Slot ${index + 1}`,
      available: true,
      userId: null,
    }));

    // Insert the slots into the database
    const createdSlots = await Slot.insertMany(initialSlots);

    res.status(200).json({ success: true, slots: createdSlots });
  } catch (error) {
    console.error('Error creating initial slots:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default createInitialSlots;
