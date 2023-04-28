import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../reducers/loadingReducer';

export default configureStore({
	reducer: {
		loading: loadingReducer,
	},
});
