import { createContext, useReducer } from 'react';

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'SET_TRANSACTION_STATS':
      return { ...state, transactionStats: action.payload };

    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t._id !== action.payload._id),
      };

    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };

    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: null,
    transactionStats: null,
  });

  return (
    <TransactionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
