// pages/api/createInitialSlots.js

import dbConnect from '../../utils/dbConnect';
import Slot from '../../models/Slot';
import City from '../../models/City';
import Place from '../../models/Place';

const createInitialSlots = async (req, res) => {
  try {
    // Connect to the database
    await dbConnect();

    // Create mock cities
    const citiesData = [
      { name: 'Chennai' },
      { name: 'Coimbatore' },
      { name: 'Madurai' },
      // Add more cities as needed
    ];

    // Insert mock cities into the database
    const createdCities = await City.insertMany(citiesData);

    // Create mock places for each city
    const placesData = [
      { name: 'Marina Beach', cityId: createdCities[0]._id.toString() },
      { name: 'Brookefields Mall', cityId: createdCities[1]._id.toString() },
      { name: 'Meenakshi Temple', cityId: createdCities[2]._id.toString() },
      // Add more places as needed
    ];

    // Insert mock places into the database
    const createdPlaces = await Place.insertMany(placesData);

    // Create initial slots associated with actual city and place IDs
    const initialSlots = Array.from({ length: 10 }, (_, index) => {
      const randomCity = createdCities[Math.floor(Math.random() * createdCities.length)];
      const randomPlace = createdPlaces.find(place => place.cityId === randomCity._id.toString()) || createdPlaces[0]; // Use the first place if not found
      
      return {
        location: `Slot ${index + 1}`,
        available: true,
        userId: null,
        cityId: randomCity._id,
        placeId: randomPlace._id,
      };
    });

    // Insert the slots into the database
    const createdSlots = await Slot.insertMany(initialSlots);

    res.status(200).json({ success: true, slots: createdSlots });
  } catch (error) {
    console.error('Error creating initial slots:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export default createInitialSlots;
