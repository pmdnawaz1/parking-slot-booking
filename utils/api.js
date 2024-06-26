// utils/api.js

const API_BASE_URL = '/api';

export const login = async (username, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});
		return response;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};

export const unbookSlot = async (email, otp) => {
	try {
		const response = await fetch('/api/unbookSlot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, otp }),
		});
		console.log('Response:', response);
		if (response.status === 404) {
			throw new Error('No slot booked by the user');
		}
		alert('Slot unbooked successfully');
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
export const signUp = async (username, email, password) => {
	try {
		const response = await fetch(`${API_BASE_URL}/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});
		return response;
	} catch (error) {
		console.error('Error:', error);
	}
};
export const fetchAvailableSlots = async (placeId) => {
	try {
		// Construct the URL with the optional placeId parameter
		const url = `${API_BASE_URL}/slots?placeId=${placeId}`;
		const response = await fetch(url);

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
export const fetchSlotById = async (slotId) => {
	try {
		const response = await fetch(`${API_BASE_URL}/slotById/${slotId}`);

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

export const sendMail = async (userEmail) => {
	try {
		const response = await fetch(`${API_BASE_URL}/mail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userEmail }),
		});
	} catch (error) {
		console.error('Error sending mail:', error);
	}
};

export const validateOtp = async (email, otp) => {
	try {
		const response = await fetch(`${API_BASE_URL}/mailOtpValidate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, otp }),
		});
		console.log('response', response);

		return response;
	} catch (error) {
		console.error('Error validating OTP:', error);
	}
};

export const confirmBooking = async (slotId, userId) => {
	try {
		const response = await fetch(`${API_BASE_URL}/booking`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slotId, userId }),
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

export const fetchCities = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/cities`);

		if (!response.ok) {
			throw new Error('Failed to fetch cities');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching cities:', error);
		throw error;
	}
};

export const fetchPlaces = async (cityId) => {
	try {
		const response = await fetch(`${API_BASE_URL}/places/${cityId}`);

		if (!response.ok) {
			throw new Error('Failed to fetch places');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching places:', error);
		throw error;
	}
};
