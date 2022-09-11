import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3001';

export const fetchTodoThunk = createAsyncThunk(
	'todo/fetchTodoThunk',
	async function (_, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(`${url}/todos`);
			if (!response.ok) throw new Error(`Error with status ${response.status}`);
			const data = await response.json();
			dispatch(fetchTodo(data));
		} catch (error) {
			rejectWithValue(error.message);
		}
	}
);

export const todoSlice = createSlice({
	name: 'todo',
	initialState: {
		todos: [],
		nextId: 1,
	},
	reducers: {
		fetchTodo(state, action) {
			state.todos = action.payload;
		},
		addTodo(state, action) {
			console.log(action.payload.title);
			state.todos.push({
				id: state.nextId,
				title: action.payload.title,
			});
			state.nextId++;
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
		},
	},
});

export const { fetchTodo, addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
