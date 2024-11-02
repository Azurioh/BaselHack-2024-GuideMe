import './global.css'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import AuthorizedRoute from './Component/AuthorizedRoute'
import { Layout } from 'antd'
import LandingPage from './pages/LandingPage'
import AppHeader from './Component/AppHeader'
import Profile from './pages/Profile'
import Logout from './pages/Logout'

function App() {
  const location = useLocation();
  const displayHeader = location.pathname === "/application" || location.pathname === "/profile";

  return (
    <Layout style={{
      minHeight: '100vh',
      backgroundImage: 'url("/background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      {displayHeader && <AppHeader />}

      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/application' element={<AuthorizedRoute><Home/></AuthorizedRoute>} />
        <Route path='/profile' element={<AuthorizedRoute><Profile/></AuthorizedRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </Layout>
  )
}

export default App
