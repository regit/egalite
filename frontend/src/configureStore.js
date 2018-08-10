import {createStore, combineReducers,  applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import organizationsReducer from './reducers/organizations';

export const rootReducer = combineReducers({
	organizations: organizationsReducer,
});

const store =  createStore(rootReducer,
	applyMiddleware(
		thunk,
	)
);

export default store;