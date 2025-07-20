import { useAuthContext } from "./useAuthContext";
import { useNoteContext } from './useNoteContext'
import { useTodoContext } from "./useTodoContext";
import { useBookmarkContext } from "./useBookmarkContext";
import { useTransactionContext } from "./useTransactionContext";
import { usePomodoroContext } from "./usePomodoroContext";


export const useLogout = () => {

        const { dispatch } = useAuthContext();
        const { dispatch: todoDispatch} = useTodoContext();
        const { dispatch: noteDispatch } = useNoteContext();
        const { dispatch: pomodoroDispatch } = usePomodoroContext();
        const { dispatch: bookmarkDispatch } = useBookmarkContext();
        const { dispatch: transactionDispatch } = useTransactionContext();

    const logout = () => {

        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
        noteDispatch({type: 'SET_NOTES', payload: null});
        todoDispatch({type: 'SET_TODOS', payload: null});
        pomodoroDispatch({type: 'SET_POMODORO', payload: null});
        bookmarkDispatch({type: 'SET_BOOKMARKS', payload: null});
        transactionDispatch({type: 'SET_TRANSACTION_STATS', payload: null});
        transactionDispatch({type: 'SET_TRANSACTIONS', payload: null});
    }
    return { logout };

 }