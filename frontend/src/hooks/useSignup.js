import { useAuthContext } from "./useAuthContext";
import { useState } from 'react';

const useSignup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    

    const {dispatch} = useAuthContext();

    const signup = async (email, password) => {

        try {
            setError(null);
            setLoading(true);

            const response = fetch('api/user/signup', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })

            const json = await response.json();

            if(!response.ok) {
                setError(json.error || 'Signup failed')
            }

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});

        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
        finally {
            setLoading(false);
        }

    }
    return {error, login, signup};

}