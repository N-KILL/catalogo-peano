import React from 'react'

// Components
import { DrawerMenu } from '../drawer/Drawer'
import { CartWidget } from '../cart/Cart'

// Css
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <DrawerMenu />
        <CartWidget />
      </div>
    </nav>
  )
}
