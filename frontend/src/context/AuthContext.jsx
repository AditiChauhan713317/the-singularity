import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [authIsReady, setAuthIsReady] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log("local storage accessed !!!!!!")

    if (storedUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
    }

    // backend is sending an object containing two fields "user" & "token"

    setAuthIsReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, authIsReady }}>
      {children}
    </AuthContext.Provider>
  );
};
