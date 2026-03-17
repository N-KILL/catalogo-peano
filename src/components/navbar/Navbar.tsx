import React from 'react'

// Components
import { DrawerMenu } from '../drawer/Drawer'
import { CartWidget } from '../cart/Cart'
import { UserMenu } from './UserMenu/UserMenu'

// Css
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <DrawerMenu />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <UserMenu />
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}
