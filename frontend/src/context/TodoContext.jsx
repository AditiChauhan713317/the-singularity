import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { todos: action.payload };

    case 'DELETE_TODO':
      return {
        todos: state.todos.filter((t) => t._id !== action.payload),
      };

    case 'ADD_TODO':
      return {
        todos: [action.payload, ...state.todos],
      };

    case 'UPDATE_TODO':
      return {
        todos: state.todos.map((t) =>
          t._id === action.payload._id ? action.payload.todo : t
        ),
      };

    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
  });

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
