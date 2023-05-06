import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../reducers/loading';
import tokenReducer from '../reducers/token';

export default configureStore({
	reducer: {
		loading: loadingReducer,
		token: tokenReducer,
	},
});
