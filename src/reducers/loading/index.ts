import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payload {
	status: boolean;
}

export const loadingSlice = createSlice({
	name: 'loading',
	initialState: {
		value: false,
	},
	reducers: {
		enableLoading: (state, action: PayloadAction<Payload>) => {
			const { payload: { status } } = action;

			state.value = status;
		},
	},
});

export const { enableLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
