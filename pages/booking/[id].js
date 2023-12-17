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
          console.log("id", id);
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
      console.log('Booking Confirmation:', confirmation);

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
    <div>
      <h1>Booking Details</h1>
      <p>
        Location: {selectedSlot.location}
        <br />
        Status: {selectedSlot.available ? 'Available' : 'Booked'}
        <br />
        User: {selectedSlot.available ? 'N/A' : selectedSlot.userId}
      </p>
      <button onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default Booking;
