import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addTodo,
	fetchTodoThunk,
	removeTodo,
} from '../storeReduxToolkit/todoSlice.js';

const ReduxToolkitPage = () => {
	const [input, setInput] = useState('');
	const { todos } = useSelector(state => state.todo);
	const dispatch = useDispatch();
	const onAddTodo = () => {
		if (input.length) dispatch(addTodo({ title: input }));
	};
	const onRemoveTodo = id => {
		dispatch(removeTodo({ id }));
	};
	useEffect(() => {
		dispatch(fetchTodoThunk());
	}, [dispatch]);
	return (
		<div>
			<input
				type='text'
				value={input}
				onChange={e => setInput(e.target.value)}
			/>
			<button onClick={onAddTodo}>Add</button>
			{todos.map(todo => (
				<div key={todo.id}>
					<span>{todo.title}</span>
					<button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
				</div>
			))}
		</div>
	);
};

export default ReduxToolkitPage;
