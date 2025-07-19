import { createContext, useReducer } from 'react';

export const PomodoroContext = createContext();

const pomodoroReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POMODORO':
      return { pomodoroSessions: action.payload };
    case 'ADD_POMODORO':
      return { pomodoroSessions: [action.payload, ...state.pomodoroSessions] };
    case 'DELETE_POMODORO':
      return {
        pomodoroSessions: state.pomodoroSessions.filter((session) => session._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PomodoroContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pomodoroReducer, {
    pomodoroSessions: [],
  });

  return (
    <PomodoroContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};
