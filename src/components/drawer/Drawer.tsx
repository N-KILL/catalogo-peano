import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Icons
import { IoHomeSharp } from "react-icons/io5";
import { LuPackageSearch } from "react-icons/lu";

// Logo
import myLogo from '/images/logo.png'

// Css
import './Drawer.css'

export function DrawerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="drawer-menu">
      <button className="drawer-button" onClick={toggleMenu}>
        <span className={`drawer-line ${isOpen ? 'hide' : ''}`}></span>
        <span className={`drawer-line ${isOpen ? 'hide' : ''}`}></span>
        <span className={`drawer-line ${isOpen ? 'hide' : ''}`}></span>
      </button>
      {isOpen && (
        <div className="backdrop" onClick={handleBackdropClick}></div>
      )}
      <nav className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src={myLogo} alt="Logo repuestos peano" />
        </div>
        <div className="drawer-menu">
          <Link to="/home" onClick={handleLinkClick} className={window.location.pathname === '/' ? 'selected' : ''}>
            <IoHomeSharp className="icon-size" /> Inicio
          </Link>
          <Link to="/products" onClick={handleLinkClick} className={window.location.pathname === '/products' ? 'selected' : ''}>
            <LuPackageSearch className="icon-size" /> Productos
          </Link>
        </div>
      </nav>
    </div>
  )
}
