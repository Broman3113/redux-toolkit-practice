import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const url = 'http://localhost:3001';

export const fetchTodoThunk = createAsyncThunk(
	'todo/fetchTodoThunk',
	async function (_, {rejectWithValue, dispatch}) {
		try {
			const response = await fetch(`${url}/todos`);
			if (!response.ok) throw new Error(`Error with status ${response.status}`);
			const data = await response.json();
			dispatch(fetchTodo(data));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const addTodoThunk = createAsyncThunk(
	'todo/addTodoThunk',
	async function (title, {rejectWithValue, dispatch}) {
		try {
			const response = await fetch(`${url}/todos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
				}),
			});
			if (!response.ok)
				throw new Error(`Error while adding with status: ${response.status}`);
			const data = await response.json();
			dispatch(addTodo(data));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
export const removeTodoThunk = createAsyncThunk(
	'todo/removeTodoThunk',
	async function (id, {rejectWithValue, dispatch}) {
		try {
			const response = await fetch(`${url}/todos/${id}`, {method: 'DELETE'});
			if (!response.ok) throw new Error(`Error while removing with status: ${response.status}`);
			dispatch(removeTodo({id}));
			return (id);
		} catch (error) {
			return rejectWithValue({id, error: error.message});
		}
	},
);

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		todos: [],
		fetchStatus: {
			status: 'ok',
			error: null,
		},
		addStatus: {
			status: 'ok',
			error: null,
		},
		itemsStatus: {},
	},
	reducers: {
		fetchTodo(state, action) {
			state.todos = action.payload;
		},
		addTodo(state, action) {
			console.log(action.payload);
			state.todos.push(action.payload);
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[fetchTodoThunk.pending]: state => {
			state.fetchStatus = {
				status: 'loading',
				error: null,
			};
		},
		[fetchTodoThunk.fulfilled]: state => {
			state.fetchStatus = {
				status: 'ok',
				error: null,
			};
		},
		[fetchTodoThunk.rejected]: (state, action) => {
			state.fetchStatus = {
				status: 'error',
				error: action.payload,
			};
		},

		[addTodoThunk.pending]: state => {
			state.addStatus = {
				status: 'loading',
				error: null,
			};
		},
		[addTodoThunk.fulfilled]: state => {
			state.addStatus = {
				status: 'ok',
				error: null,
			};
		},
		[addTodoThunk.rejected]: (state, action) => {
			state.addStatus = {
				status: 'error',
				error: action.payload,
			};
		},

		[removeTodoThunk.pending]: (state, action) => {
			state.itemsStatus = {
				...state.itemsStatus,
				// returns id
				[action.meta.arg]: {
					status: 'loading',
					error: null,
				},
			}
		},
		[removeTodoThunk.fulfilled]: (state, action) => {
			console.log('fulfilled', action.payload)
			state.itemsStatus = {
				...state.itemsStatus,
				[action.payload]: {
					status: 'ok',
					error: null,
				},
			}
		},
		[removeTodoThunk.rejected]: (state, action) => {
			state.itemsStatus = {
				...state.itemsStatus,
				[action.payload.id]: {
					status: 'error',
					error: action.payload.error,
				},
			}
		},
	},
});

export const {fetchTodo, addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
