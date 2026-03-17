import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../../../store/authStore';
import './UserMenu.css';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        className="user-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <FaUserCircle className="user-icon" />
      </button>

      {isOpen && (
        <div className="user-dropdown-modal">
          {user ? (
            <div className="user-logged-in-content">
              <div className="user-info">
                <span className="user-email">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="user-guest-content">
              <h4>Mi cuenta</h4>
              <p>Iniciá sesión para una mejor experiencia.</p>

              <Link to="/login" className="login-btn-link" onClick={() => setIsOpen(false)}>
                Iniciar sesión
              </Link>

              <div className="register-prompt">
                <span className="register-text">¿No tenés cuenta? </span>
                <Link
                  to="/login?defaultMode=register"
                  className="register-link"
                  onClick={() => setIsOpen(false)}
                >
                  crear una
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
