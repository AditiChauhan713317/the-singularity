import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';


const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');

    const {error, setError, loading, setLoading, signup} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, email, password, profile);

        if(!username || !email || !password) {
            setError('All fields must be filled');
            return;
        }

        await signup(username, email, password, profile);


    }

    return (

        <div >
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border border-white rounded-2xl">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} className='border border-white rounded-2xl px-1 py-2'/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} className='border border-white rounded-2xl px-1 py-2'/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className='border border-white rounded-2xl px-1 py-2'/>

                <label htmlFor="profile">Profile pic:</label>
                <p>{"(optional)"}</p>
                <input type="file" id="profile" name="profile" accept=".png,.jpg,.jpeg" onChange={(e) => setProfile(e.target.value)} className=' cursor-pointer border border-white rounded-2xl px-1 py-2' />

                <button type="submit" disabled={loading}>Submit</button>
                {error && <p className='text-red-700'>{error}</p>}
        </form>

            
        
        </div>

    )

}

export default Signup;


