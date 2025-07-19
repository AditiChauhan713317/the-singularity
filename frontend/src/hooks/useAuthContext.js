import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {

    const context = useContext(AuthContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use useAuthContext only in components wrapped in AuthContextProvider")
    }

    return context;

}