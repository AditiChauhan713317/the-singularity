import { useAuthContext } from './useAuthContext';
import { useEffect, useState } from 'react';

export const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        try {
            
            setLoading(true);
            setError(null);

            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            const json = await response.json();

            setLoading(false);
            if(!response.ok) {
                throw new Error(json.error || 'Login failed');
            }
            else {
                localStorage.setItem('user' ,JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
            }
            

        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
        finally {
            setLoading(false);
        }

    }
    return {error, setError, loading, setLoading, login};

}

