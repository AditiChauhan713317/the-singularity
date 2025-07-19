import { useAuthContext } from './useAuthContext';
import { useEffect, useState } from 'react';

const useLogin = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        try {
            
            setLoading(true);
            setError(null);

            const response = fetch('/api/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

            const json = await response.json();

            setLoading(false);
            if(!response.ok) {
                setError(json.error || 'Login failed');
            }
            else {
                localStorage.setItem('user' ,JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
            }
            
            return 

        } catch (error) {
            setError(error.message || 'Something went wrong')
        }
        finally {
            setLoading(false);
        }

    }
    return {error, loading, login};

}

