import {
	addTodoActionFailure,
	addTodoActionRequest,
	addTodoActionSuccess,
	fetchTodoFailure,
	fetchTodoRequest,
	fetchTodoSuccess,
	removeTodoActionFailure,
	removeTodoActionRequest,
	removeTodoActionSuccess,
} from './actions';
const url = 'http://localhost:3001/todos';

export const fetchTodoThunk = () => {
	return async dispatch => {
		dispatch(fetchTodoRequest());
		fetch(url)
			.then(response => {
				if (!response.ok)
					throw new Error(
						`Error occurred while fetching with status: ${response.status}`
					);
				return response.json();
			})
			.then(data => {
				dispatch(fetchTodoSuccess(data));
			})
			.catch(error => dispatch(fetchTodoFailure(error.message)));
	};
};

export const addTodoThunk = title => {
	return async dispatch => {
		dispatch(addTodoActionRequest());
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
			}),
		})
			.then(response => {
				if (!response.ok)
					throw new Error(
						`Error occurred while adding todo with status ${response.status}`
					);
				return response.json();
			})
			.then(data => {
				dispatch(addTodoActionSuccess(data));
			})
			.catch(error => dispatch(addTodoActionFailure(error.message)));
	};
};

export const removeTodoThunk = id => {
	return async dispatch => {
		dispatch(removeTodoActionRequest(id));
		fetch(`${url}/${id}`, { method: 'DELETE' })
			.then(response => {
				if (!response.ok) throw new Error(`Error status: ${response.status}`);
				return response.json();
			})
			.then(data => dispatch(removeTodoActionSuccess(id)))
			.catch(error =>
				dispatch(removeTodoActionFailure({ id, error: error.message }))
			);
	};
};
