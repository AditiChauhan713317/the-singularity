const TodoItem = ({todo, handleDelete, handleToggle, onClick}) => {

    return (
        <div>
            <p onClick={onClick} className={todo.completed ? "line-through text-gray-500" : "text-white"}>{todo.text}</p>
            <button onClick={handleDelete}>Delete</button>
            <button className="bg-red-600" onClick={handleToggle}>done</button>
    
        </div>
    )

}

export default TodoItem;