// pages/index.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchAvailableSlots } from '../../utils/api';
import { setSlots } from '../../redux/slices/slotsSlice';
import { isAuthenticated } from '../../utils/auth';

export default function Home() {
  const dispatch = useDispatch();
  const availableSlots = useSelector((state) => state.slots);
  const router = useRouter();
  const placeId  = router.query.place;

  useEffect(() => {
    const getAvailableSlots = async () => {
      if(placeId){ 
        try {
          const slots = await fetchAvailableSlots(placeId); // Pass the place to the API function

          dispatch(setSlots(slots));
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };

    getAvailableSlots();
  }, [dispatch, placeId]);

  const handleSlotClick = (slot) => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    if (!slot.available) {
      alert('This slot is not available.');
      return;
    }

    window.location.href = `/booking/${slot._id}`;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Available Parking Slots</h1>
      {availableSlots.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {availableSlots.map((slot) => (
            <div
              key={slot._id}
              onClick={() => handleSlotClick(slot)}
              className={`p-4 border rounded-lg ${
                slot.available ? 'bg-green-200 hover:bg-green-300 cursor-pointer' : 'bg-red-200'
              }`}
              style={{ height: '450px', width: '250px', cursor: slot.available ? 'pointer' : 'not-allowed' }}
            >
              <p className="text-lg font-semibold">{slot.location}</p>
              <p>{slot.available ? 'Available' : 'Booked'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
