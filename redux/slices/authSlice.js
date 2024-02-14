import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserId(state, action) {
			state.auth.userId = action.payload;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.userId = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setUserId, logout } = authSlice.actions;

export const selectUserId = (state) => state.auth.userId;
export default authSlice.reducer;
