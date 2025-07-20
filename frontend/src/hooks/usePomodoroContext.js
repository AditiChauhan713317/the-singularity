import { PomodoroContext } from "../context/PomodoroContext";
import { useContext } from "react";

export const usePomodoroContext = () => {

    const context = useContext(PomodoroContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use usePomodoroContext only in components wrapped in PomodoroContext Provider")
    }

    return context;

}