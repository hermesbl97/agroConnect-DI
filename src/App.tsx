import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Products from './pages/Products'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
