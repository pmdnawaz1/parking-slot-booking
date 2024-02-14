// models/Slot.js

import mongoose from 'mongoose';

if (mongoose.models.Place) {
  module.exports = mongoose.models.Place;
} else {
  const placeSchema = new mongoose.Schema({
    name: String,
    cityId: String,
    placeImage: String,
  });

  const Place = mongoose.model('Place', placeSchema);

  module.exports = Place;
}
