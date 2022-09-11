import {
	ADD_TODO_ACTION_FAILURE,
	ADD_TODO_ACTION_REQUEST,
	ADD_TODO_ACTION_SUCCESS,
	FETCH_TODO_FAILURE,
	FETCH_TODO_REQUEST,
	FETCH_TODO_SUCCESS,
	REMOVE_TODO_ACTION_FAILURE,
	REMOVE_TODO_ACTION_REQUEST,
	REMOVE_TODO_ACTION_SUCCESS,
} from './actions';

const initialState = {
	todos: [],
	fetchTodoStatus: 'ok',
	fetchTodoError: null,
	addTodoStatus: 'ok',
	addTodoError: null,
	pendingItemsStatus: {},
};

export const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TODO_REQUEST:
			return { ...state, fetchTodoStatus: 'loading', fetchTodoError: null };
		case FETCH_TODO_SUCCESS:
			return {
				...state,
				todos: action.payload,
				fetchTodoStatus: 'ok',
				fetchTodoError: null,
			};
		case FETCH_TODO_FAILURE:
			return {
				...state,
				fetchTodoStatus: 'error',
				fetchTodoError: action.payload,
			};
		case ADD_TODO_ACTION_REQUEST:
			return { ...state, addTodoStatus: 'loading', addTodoError: null };
		case ADD_TODO_ACTION_SUCCESS:
			return {
				...state,
				todos: [...state.todos, action.payload],
				addTodoStatus: 'ok',
				addTodoError: null,
			};
		case ADD_TODO_ACTION_FAILURE:
			return { ...state, addTodoStatus: 'error', addTodoError: action.payload };
		case REMOVE_TODO_ACTION_REQUEST:
			return {
				...state,
				pendingItemsStatus: {
					...state.pendingItemsStatus,
					[action.payload.id]: {
						status: 'loading',
						error: null,
					},
				},
			};
		case REMOVE_TODO_ACTION_SUCCESS:
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== action.payload.id),
				pendingItemsStatus: {
					...state.pendingItemsStatus,
					[action.payload.id]: {
						status: 'ok',
						error: null,
					},
				},
			};
		case REMOVE_TODO_ACTION_FAILURE:
			return {
				...state,
				pendingItemsStatus: {
					...state.pendingItemsStatus,
					[action.payload.id]: {
						status: 'error',
						error: action.payload.error,
					},
				},
			};
		default:
			return state;
	}
};
