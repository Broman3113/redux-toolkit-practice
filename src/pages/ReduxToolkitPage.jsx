import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addTodoThunk,
	fetchTodoThunk,
	removeTodo,
} from '../storeReduxToolkit/todoSlice.js';

const ReduxToolkitPage = () => {
	const [input, setInput] = useState('');
	const { todos, fetchStatus, addStatus } = useSelector(state => state.todo);
	const dispatch = useDispatch();

	console.log(addStatus);
	const onAddTodo = () => {
		if (input.length) dispatch(addTodoThunk(input));
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
			{addStatus.status === 'loading' && <span>Adding..</span>}
			{addStatus.status === 'error' && <span>{addStatus.error}</span>}
			{addStatus.status === 'ok' && <span>ok</span>}

			{fetchStatus.status === 'loading' && <p>Loading..</p>}
			{fetchStatus.status === 'error' && <p>{fetchStatus.error}</p>}
			{fetchStatus.status === 'ok' &&
				todos.map(todo => (
					<div key={todo.id}>
						<span>{todo.title}</span>
						<button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
					</div>
				))}
		</div>
	);
};

export default ReduxToolkitPage;
