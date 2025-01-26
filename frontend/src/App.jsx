import React from 'react'
import Home from './pages/Home/Home.jsx'
import Full from './pages/Full/Full.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './pages/Login/Login.jsx'
import Pen from './pages/Pen/Pen.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path='/full/:id' element={<Full />}></Route>
        <Route path='/pen/new'
               element=
               {<ProtectedRoute>
                  <Pen />
                </ProtectedRoute>}>
        </Route>
        <Route path='/pen/:id'
          element=
          {<ProtectedRoute>
            <Pen />
          </ProtectedRoute>}>
        </Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App