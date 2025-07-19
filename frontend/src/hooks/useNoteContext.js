import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNoteContext = () => {

    const context = useContext(NoteContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use useNotesContext only in components wrapped in NoteContextProvider")
    }

    return context;

}