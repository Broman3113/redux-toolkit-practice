import React, {useState} from 'react';
import {useGetTodoQuery, useAddTodoMutation, useRemoveTodoMutation} from '../storeRTKquery/api/todoApi';

const RTKqueryPage = () => {
	const [input, setInput] = useState('');
	const [limit, setLimit] = useState('');

	const {data = [], isLoading} = useGetTodoQuery(limit);
	const [addTodo, addTodoArgs] = useAddTodoMutation();
	const [removeTodo, removeTodoArgs] = useRemoveTodoMutation();

	const onAddProduct = async () => {
		if (input) await addTodo({title: input}).unwrap();
	}
	const onRemoveTodo = async (id) => {
		await removeTodo(id).unwrap();
	}

	return <div>
		<select value={limit} onChange={e => setLimit(e.target.value)}>
			<option value="">all</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<input
			type="text"
			value={input}
			onChange={e => setInput(e.target.value)}
		/>
		<button onClick={onAddProduct}>Add</button>
		{addTodoArgs.isLoading && <span>Adding..</span>}
		{addTodoArgs.isError && <span>{addTodoArgs.error.status} {JSON.stringify(addTodoArgs.error.data)}</span>}

		{isLoading && <p>Loading...</p>}
		{
			data.map(todo => <div key={todo.id}>
				<span>{todo.title}</span>
				<button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
				{removeTodoArgs.isLoading && <span>Removing..</span>}
				{removeTodoArgs.isError &&
					<span>{removeTodoArgs.error.status} {JSON.stringify(removeTodoArgs.error.data)}</span>}
			</div>)
		}
	</div>;
};

export default RTKqueryPage;
