import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    addTodoThunk,
    fetchTodoThunk,
    removeTodoThunk,
} from "../storeReduxToolkit/todoSlice.js";

const ReduxToolkitPage = () => {
    const [input, setInput] = useState("");
    const {
        todos,
        fetchStatus,
        addStatus,
        itemsStatus
    } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    const onAddTodo = () => {
        if (input.length) dispatch(addTodoThunk(input));
    };
    const onRemoveTodo = (id) => {
        dispatch(removeTodoThunk(id));
    };

    useEffect(() => {
        dispatch(fetchTodoThunk());
    }, [dispatch]);
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={onAddTodo}>Add</button>
            {addStatus.status === "loading" && <span>Adding..</span>}
            {addStatus.status === "error" && <span>{addStatus.error}</span>}

            {fetchStatus.status === "loading" && <p>Loading..</p>}
            {fetchStatus.status === "error" && <p>{fetchStatus.error}</p>}
            {fetchStatus.status === "ok" &&
                todos.map((todo) => (
                    <div key={todo.id}>
                        <span>{todo.title}</span>
                        <button onClick={() => onRemoveTodo(todo.id)}>&times;</button>
                        {itemsStatus[todo.id]?.status === 'loading' && <span>Removing..</span>}
                        {itemsStatus[todo.id]?.status === 'error' && <span>{itemsStatus[todo.id]?.error}</span>}
                    </div>
                ))}
        </div>
    );
};

export default ReduxToolkitPage;
