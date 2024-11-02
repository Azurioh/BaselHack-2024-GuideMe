import './global.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import AuthorizedRoute from './components/AuthorizedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthorizedRoute><Home/></AuthorizedRoute>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
