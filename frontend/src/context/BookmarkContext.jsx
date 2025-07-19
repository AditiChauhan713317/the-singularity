// BookmarkContext.js
import { createContext, useReducer } from 'react';

export const BookmarkContext = createContext();

const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return { bookmarks: action.payload };
    case 'ADD_BOOKMARK':
      return { bookmarks: [action.payload, ...state.bookmarks] };
    case 'DELETE_BOOKMARK':
      return {
        bookmarks: state.bookmarks.filter((b) => b._id !== action.payload._id),
      };
      case 'UPDATE_BOOKMARK':
      return {
        bookmarks: state.bookmarks.map((b) =>
          b._id === action.payload._id ? action.payload.bookmark : b
        ),
      };
    default:
      return state;
  }
};

export const BookmarkContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, {
    bookmarks: [],
  });

  return (
    <BookmarkContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};
