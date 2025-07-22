import { useTodoContext } from '../hooks/useTodoContext';
import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Todos = () => {

    const {todos, dispatch} = useTodoContext();

    const [newTodo, setNewTodo] = useState('');
    const [editTodo, setEditTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState('');
    const [error, setError] = useState(null);

    const {user} = useAuthContext();


    useEffect(() => {
        
        const fetchTodos = async () => {
            try {
                const response = await fetch('/api/todo/todos', {
                    headers: {
                        'authorization': `Bearer ${user.token}`
                    }

                });
                if(!response.ok) {
                    throw new Error('Something went wrong' )
                }
                const json = await response.json();
                console.log('TODOS', json.todos);
                dispatch({type: 'SET_TODOS', payload: json.todos});
                

            } catch (error) {
                setError(error.message);
            }
        }

        if(user) {
            fetchTodos();
            
        }

    }, [])

    

    const handleDelete = async (_id) => {
        console.log(_id);
        try {
            const response = await fetch(`api/todo/todos/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }

            })
            if(!response.ok) {
                throw new Error('Delete failed');
            }
            
            dispatch({type: 'DELETE_TODO', payload: _id});
            console.log("dispatched");

        } catch (error) {
            setError(error.message);
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('api/todo/todos', {
                method: 'POST', 
                body: JSON.stringify({ text: newTodo }),
                headers: {
                     'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(!response.ok) {
                throw new Error('Unable to create todo')
            }

            const newTodoData = await response.json();

            
            dispatch({type: 'ADD_TODO', payload: newTodoData.todo})
            setNewTodo('');

        } catch (error) {
            setError(error.message)
        }
    }

    const handleToggle = async (_id) => {
    

        try {
            const response = await fetch(`api/todo/todos/toggle/${_id}`, {
                method: 'PATCH', 
                headers: {
                     'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if(!response.ok) {
                throw new Error('Unable to toggle todo')
            }

            const newTodoData = await response.json();
            console.log(newTodoData);
            
            dispatch({type: 'UPDATE_TODO', payload: {_id: _id, todo: newTodoData.todo}})

        } catch (error) {
            setError(error.message)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`api/todo/todos/${editTodoId}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ text: editTodo })
            })
            if(!response.ok) {
                throw new Error('Unable to toggle todo')
            }

            const newTodoData = await response.json();
            console.log(newTodoData);
            
            dispatch({type: 'UPDATE_TODO', payload: {_id: editTodoId, todo: newTodoData.todo}})
            setEditTodo('');
            setEditTodoId('');


        } catch (error) {
            setError(error.message);
        }
    }
   
    const prefillInput = (todo) => {
        setEditTodoId(todo._id); 
        setEditTodo(todo.text); // prefill input
    }

    return (

        <div>

            <ul>
                {/* todos may be null */}
                {todos && todos.map((todo, index) => (
                    <li key={todo._id || index}>
                        {editTodoId === todo._id ?  
                        <form onSubmit={handleEdit}>
                        <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)}  className='border p-2 rounded-2xl'/>
                        </form>
                        : 
                            <TodoItem todo={todo} handleDelete={() => handleDelete(todo._id)} handleToggle={() => handleToggle(todo._id)} onClick={() => prefillInput(todo)}/>
                        }
                        </li>
                ))}
            </ul>
            <form onSubmit={handleCreate}>
                <label>Enter Todo:</label>
                <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo} className='border rounded-2xl p-3'/>
            </form>
            {error && <p className='text-red-600'>{error}</p>}
            
        </div>

    )

}

export default Todos;