import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todoReducer } from './todo/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	todo: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
