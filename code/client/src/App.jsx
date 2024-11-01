import { useState, useEffect } from 'react'
import MyTable from './Component/table.jsx'

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
