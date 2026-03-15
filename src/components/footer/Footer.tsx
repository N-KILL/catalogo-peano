import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Icons
import { FaWhatsapp, FaChevronUp, FaChevronDown, FaInstagram, FaFacebook } from 'react-icons/fa';

// Css
import './Footer.css';

export function Footer() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isOpen, setIsOpen] = useState(false);
    const isExpanded = isHome || isOpen;

    return (
        <footer className={`footer-section ${isExpanded ? 'open' : 'closed'} ${isHome ? 'is-home' : ''}`}>
            {/* Toggle button only shown on non-Home pages */}
            {!isHome && (
                <button
                    className="footer-toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Footer"
                >
                    {isExpanded ? <FaChevronDown /> : <FaChevronUp />}
                    <span style={{ marginLeft: '8px' }}>Más información</span>
                </button>
            )}

            <div className="footer-container">
                <div className="footer-columns">
                    <div className="footer-links">
                        <h3>Columna 1</h3>
                        <p>Item 1</p>
                    </div>

                    <div className="footer-links">
                        <h3>Columna 2</h3>
                        <p>Item 1</p>
                    </div>

                    <div className="footer-links">
                        <h3>Columna 3</h3>
                        <p>Item 1</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Peano Repuestos. Todos los derechos reservados.</p>
                    <div className="footer-socials">
                        <a href='https://wa.me/5493585188228' target="_blank" rel="noopener noreferrer"><FaWhatsapp size={24} color='white' /></a>
                        <a href='https://www.instagram.com/peanorepuestos1/' target="_blank" rel="noopener noreferrer"><FaInstagram size={24} color='white' /></a>
                        <a href='https://www.facebook.com/Peano.Repuestos/' target="_blank" rel="noopener noreferrer"><FaFacebook size={24} color='white' /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
