export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';

export const ADD_TODO_ACTION_REQUEST = 'ADD_TODO_ACTION_REQUEST';
export const ADD_TODO_ACTION_SUCCESS = 'ADD_TODO_ACTION_SUCCESS';
export const ADD_TODO_ACTION_FAILURE = 'ADD_TODO_ACTION_FAILURE';

export const REMOVE_TODO_ACTION_REQUEST = 'REMOVE_TODO_ACTION_REQUEST';
export const REMOVE_TODO_ACTION_SUCCESS = 'REMOVE_TODO_ACTION_SUCCESS';
export const REMOVE_TODO_ACTION_FAILURE = 'REMOVE_TODO_ACTION_FAILURE';

export const fetchTodoRequest = () => {
	return {
		type: FETCH_TODO_REQUEST,
	};
};
export const fetchTodoSuccess = todos => {
	return {
		type: FETCH_TODO_SUCCESS,
		payload: todos,
	};
};
export const fetchTodoFailure = error => {
	return {
		type: FETCH_TODO_FAILURE,
		payload: error,
	};
};

export const addTodoActionRequest = id => {
	return {
		type: ADD_TODO_ACTION_REQUEST,
		payload: {
			id,
		},
	};
};
export const addTodoActionSuccess = ({ id, title }) => {
	return {
		type: ADD_TODO_ACTION_SUCCESS,
		payload: {
			id,
			title,
		},
	};
};
export const addTodoActionFailure = error => {
	return {
		type: ADD_TODO_ACTION_FAILURE,
		payload: error,
	};
};

export const removeTodoActionRequest = id => {
	return {
		type: REMOVE_TODO_ACTION_REQUEST,
		payload: { id },
	};
};
export const removeTodoActionSuccess = id => {
	return {
		type: REMOVE_TODO_ACTION_SUCCESS,
		payload: { id },
	};
};
export const removeTodoActionFailure = ({ id, error }) => {
	return {
		type: REMOVE_TODO_ACTION_FAILURE,
		payload: {
			id,
			error,
		},
	};
};
