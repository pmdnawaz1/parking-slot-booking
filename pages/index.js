// pages/index.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchAvailableSlots } from '../utils/api';
import { setSlots } from '../redux/slices/slotsSlice';
import { isAuthenticated } from '../utils/auth';

const initializeSlots = () => {
  // Initialize with 10 slots (replace with your actual initialization logic)
  const initialSlots = Array.from({ length: 10 }, (_, index) => ({
    _id: index.toString(),
    location: `Slot ${index + 1}`,
    available: true,
    userId: null,
  }));
  return initialSlots;
};

export default function Home() {
  const dispatch = useDispatch();
  const availableSlots = useSelector((state) => state.slots);

  useEffect(() => {
    const getAvailableSlots = async () => {
      try {
        // Fetch available slots from the API
        const slots = await fetchAvailableSlots();
        dispatch(setSlots(slots));
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    // Initialize slots if the state is empty
    if (availableSlots.length === 0) {
      const initialSlots = initializeSlots();
      dispatch(setSlots(initialSlots));
    }

    getAvailableSlots();
  }, [dispatch, availableSlots]);

  const handleSlotClick = (slot) => {
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
      return;
    }

    if (!slot.available) {
      // Display error for non-available slots
      alert('This slot is not available.');
      return;
    }

    // Redirect to booking page with the selected slot ID
    window.location.href = `/booking/${slot._id}`;
  };

  return (
    <div>
      <h1>Available Parking Slots</h1>
      {availableSlots.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {availableSlots.map((slot) => (
            <li
              key={slot._id}
              style={{ color: slot.available ? 'green' : 'red', cursor: 'pointer' }}
              onClick={() => handleSlotClick(slot)}
            >
              {slot.location} - {slot.available ? 'Available' : 'Booked'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
