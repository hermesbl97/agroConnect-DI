import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Products from './pages/Products'
import Users from './pages/Users'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './auth/AuthContext'
import RegisterUser from './pages/RegisterUser'
import JobOffers from './pages/JobOffers'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Rutas Públicas para usuarios registrados y no registrados*/}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />

            {/* Rutas Protegidas (Cualquier usuario logueado) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<Products />} />
              <Route path="/joboffers" element={<JobOffers />} />
            </Route>

            {/* Rutas solo para admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/users" element={<Users />} />
            </Route>

            {/* Rutas para agricultores y agricultor */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'agricultor']} />}>
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
