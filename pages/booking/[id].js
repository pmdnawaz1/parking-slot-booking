// pages/booking/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchSlotById, confirmBooking } from '../../utils/api';
import { isAuthenticated } from '../../utils/auth';

const Booking = () => {
  const availableSlots = useSelector((state) => state.slots);
  const router = useRouter();
  const { id } = router.query;
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    // Ensure that id is defined before attempting to fetch the slot
    if (id) {
      const getSlot = async () => {
        try {
          const slot = await fetchSlotById(id);
          setSelectedSlot(slot);
        } catch (error) {
          // Handle error
          console.error('Error fetching slot:', error);
        }
      };

      getSlot();
    }
  }, [id]);

  const handleConfirmBooking = async () => {
    try {
      // Check if the user is authenticated
      if (!isAuthenticated()) {
        // Redirect to login page if not authenticated
        router.push('/login');
        return;
      }

      // Confirm the booking
      const confirmation = await confirmBooking(id, 'userId'); // Replace 'userId' with the actual user ID

      // Handle confirmation result (e.g., display a success message)

      // Redirect to the confirmation page or perform other actions
      router.push(`/confirmation/${id}`);
    } catch (error) {
      // Handle error
      console.error('Error confirming booking:', error);
    }
  };

  if (!selectedSlot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p className="text-black-700 dark:text-black-200">
        Location: {selectedSlot.location}
        <br />
        Status: {selectedSlot.available ? 'Available' : 'Booked'}
        <br />
        User: {selectedSlot.available ? 'N/A' : selectedSlot.userId}
      </p>
      <button
        onClick={handleConfirmBooking}
        className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 text-white font-medium rounded-lg text-sm px-5 py-2 mt-6 w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
