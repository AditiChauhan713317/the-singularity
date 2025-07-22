import { useLogout } from '../hooks/useLogout';
import { useAuthContext  } from '../hooks/useAuthContext';
import Todos from '../components/Todos';

const Home = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <>
        <h1>Welcome!</h1>
        <p>{user.username}</p>

        <Todos />

        
        <button onClick={logout}>Logout</button>
</>
    )
}

export default Home;