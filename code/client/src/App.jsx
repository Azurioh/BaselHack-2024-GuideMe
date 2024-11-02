import './global.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import AuthorizedRoute from './Component/AuthorizedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthorizedRoute><Home/></AuthorizedRoute>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
