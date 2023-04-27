import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../reducers/loading';

export default configureStore({
	reducer: {
		loading: loadingReducer,
	},
});
