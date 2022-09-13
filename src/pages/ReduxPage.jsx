import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodoThunk,
    fetchTodoThunk,
    removeTodoThunk,
} from '../storeRedux/todo/thunks';

const ReduxPage = () => {
    const [input, setInput] = useState('');
    const {
        todos,
        fetchTodoStatus,
        fetchTodoError,
        addTodoStatus,
        addTodoError,
        pendingItemsStatus,
    } = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const onAddTodo = () => {
        if (input.length) dispatch(addTodoThunk(input));
    };
    const onRemoveTodo = id => {
        dispatch(removeTodoThunk(id));
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
            {fetchTodoStatus === 'loading' && <p>loading..</p>}
            {fetchTodoStatus === 'error' && <p>{fetchTodoError}</p>}
            
            {addTodoStatus === 'loading' ? (
                <span>Adding..</span>
            ) : (
                todos.map(todo => (
                    <div key={todo.id}>
                        <span>{todo.title}</span>
                        <button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
                        {pendingItemsStatus[todo.id]?.status === 'loading' && (
                            <span>Removing..</span>
                        )}
                        {pendingItemsStatus[todo.id]?.status === 'error' && (
                            <span>{pendingItemsStatus[todo.id].error}</span>
                        )}
                    </div>
                ))
            )}
            {addTodoStatus === 'error' && <p>{addTodoError}</p>}
        </div>
    );
};

export default ReduxPage;
