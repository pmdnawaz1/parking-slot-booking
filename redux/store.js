// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import slotsReducer from './slices/slotsSlice';

const store = configureStore({
  reducer: {
    slots: slotsReducer,
    // Add other reducers if needed
  },
});

export default store;
