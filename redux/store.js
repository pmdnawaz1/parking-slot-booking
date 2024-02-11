// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import slotsReducer from './slices/slotsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    slots: slotsReducer,
    auth: authReducer,
  },
});

export default store;
