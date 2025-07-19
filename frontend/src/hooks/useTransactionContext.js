import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";

export const useTransactionContext = () => {

    const context = useContext(TransactionContext);
    // context is an obj containing properties state and dispatch

    // before returning the context check if some component outside the "provider wrapper" is accessing the global state cause then the context will be "null"
    if(!context) {
        throw Error("you can use useTransactionContext only in components wrapped in TransactionContextProvider")
    }

    return context;

}