import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {error, setError, loading, setLoading, login} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password) {
            setError('All fields must be filled');
            return;
        }
            

        console.log(email, password);

        await login(email, password);
    }

    return (

        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border border-white rounded-2xl">
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className='border border-white rounded-2xl px-1 py-2'/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className='border border-white rounded-2xl px-1 py-2'/>


                <button type="submit" disabled={loading}>Submit</button>
                {error && <p className='text-red-700'>{error}</p>}
        </form>
       
        </>
        
        
        
    )

}

export default Login;