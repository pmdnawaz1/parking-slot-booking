// utils/api.js

const API_BASE_URL = '/api';

export const fetchAvailableSlots = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/slots`);

    if (!response.ok) {
      throw new Error('Failed to fetch available slots');
    }

    const data = await response.json();
    return data.slots;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

export const fetchSlotById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/slots/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch slot by ID');
    }

    const data = await response.json();
    return data.slot;
  } catch (error) {
    console.error('Error fetching slot by ID:', error);
    throw error;
  }
};

export const confirmBooking = async (id, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slotId: id, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to confirm booking');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming booking:', error);
    throw error;
  }
};
