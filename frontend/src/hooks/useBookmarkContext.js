import { BookmarkContext } from "../context/BookmarkContext";
import { useContext } from "react";

export const useBookmarkContext = () => {

    const context = useContext(BookmarkContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use useBookmarkContext only in components wrapped in BookmarkContextProvider")
    }

    return context;

}