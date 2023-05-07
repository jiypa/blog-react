import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payload {
    token: string;
}

export const tokenSlice = createSlice({
	name: 'token',
	initialState: {
		value: localStorage.getItem('token'),
	},
	reducers: {
		setValue: (state, action: PayloadAction<Payload>) => {
			const { payload: { token } } = action;

			state.value = token;
		},
	},
});

export const { setValue } = tokenSlice.actions;

export default tokenSlice.reducer;
