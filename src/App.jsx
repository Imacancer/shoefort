import React from 'react'
import Index from './pages/Index'
import Login from './pages/Login'
import Products from './pages/Products'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Products' element={<Products/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App

