// models/Slot.js

import mongoose from 'mongoose';

if (mongoose.models.Slot) {
  module.exports = mongoose.models.Slot;
} else {
  const slotSchema = new mongoose.Schema({
    location: String,
    available: Boolean,
    userId: String,
    cityId: String,  
    placeId: String, 
  });

  const Slot = mongoose.model('Slot', slotSchema);

  module.exports = Slot;
}
