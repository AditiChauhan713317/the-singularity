import { useLogout } from '../hooks/useLogout';
import { useAuthContext  } from '../hooks/useAuthContext';
const Home = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <>
        <h1>Welcome!</h1>
        <ul>
            <li>{user.user.username}</li>
        </ul>
        <button onClick={logout}>Logout</button>
</>
    )
}

export default Home;