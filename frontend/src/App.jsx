import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const { user, authIsReady } = useAuthContext();
  
  if (!authIsReady) {
    return <p>Loading...</p>; 
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <div className='pages'>

          <Routes>

              <Route path='/' element={user ? <Home /> : <Navigate to = '/login' />} />
              <Route path='/login' element={user ? <Navigate to = '/' />  : <Login />} />
              <Route path='/signup' element={user ? <Navigate to = '/' /> : <Signup />} />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
