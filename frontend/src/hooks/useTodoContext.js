import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export const useTodoContext = () => {

    const context = useContext(TodoContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use useTodoContext only in components wrapped in TodoContextProvider")
    }

    return context;

}