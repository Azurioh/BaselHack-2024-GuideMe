import './global.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import AuthorizedRoute from './components/AuthorizedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
