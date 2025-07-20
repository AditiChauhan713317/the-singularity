import { useAuthContext } from "./useAuthContext";
import { useState } from 'react';

export const useSignup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    

    const {dispatch} = useAuthContext();

    const signup = async (username, email, password, profileUrl) => {

        try {
            setError(null);
            setLoading(true);

            const response = await fetch('api/user/signup', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password, profileUrl})
            })

            const json = await response.json();

            if(!response.ok) {
                setError(json.error || 'Signup failed')
            }
            else {
                localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            }

            

        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
        finally {
            setLoading(false);
        }

    }
    return {error, setError, loading, setLoading, signup};

}

