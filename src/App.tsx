import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Provider
import { CartProvider } from './context/CartContext'

// Component
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'
import { WhatsAppButton } from './components/whatsapp/WhatsAppButton'

// Pags
import { Home } from './pages/home/Home'
import { Catalog } from './pages/catalog/Catalog'

// Css
import './App.css'

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Catalog />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton phoneNumber="5493585188228" />
      </CartProvider>
    </Router>
  )
}

export default App
