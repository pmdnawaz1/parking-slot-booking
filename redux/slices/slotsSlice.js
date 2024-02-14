// redux/slices/slotsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const slotsSlice = createSlice({
  name: 'slots',
  initialState: [],
  reducers: {
    setSlots: (state, action) => {
      return action.payload;
    },
    bookSlot: (state, action) => {
      const { slotId, userId } = action.payload;
      const slotIndex = state.findIndex((slot) => slot._id === slotId);

      if (slotIndex !== -1) {
        state[slotIndex].available = false;
        state[slotIndex].userId = userId;
      }
    },
  },
});

export const { setSlots, bookSlot } = slotsSlice.actions;
export default slotsSlice.reducer;
    