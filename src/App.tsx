import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'

// Store
import { initializeAuth } from './store/authStore'

// Provider
import { CartProvider } from './context/CartContext'

// Component
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'
import { WhatsAppButton } from './components/whatsapp/WhatsAppButton'

// Pags
import { Home } from './pages/home/Home'
import { Catalog } from './pages/catalog/Catalog'
import LoginRegisterPage from './pages/auth/login-register/LoginRegisterPage'

// Css
import './App.css'

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="5493585188228" />
    </>
  )
}

function App() {
  useEffect(() => {
    const subscription = initializeAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <CartProvider>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Auth Route (No Navbar/Footer) */}
          <Route path="/login" element={<LoginRegisterPage />} />

          {/* Main App Routes (With Navbar/Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Catalog />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  )
}

export default App
