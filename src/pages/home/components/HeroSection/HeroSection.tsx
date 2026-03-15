import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

// Icons
import { FaWhatsapp } from 'react-icons/fa';

// Components
import { SearchBar } from 'components/searchBar/SearchBar'

// Css
import './HeroSection.css';

export function HeroSection() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-container">
                {/* Left content */}
                <div className="hero-content">

                    <h1 className="hero-title">
                        Repuestos para{' '}
                        <span className="hero-title-accent">Cada Vehículo</span>
                    </h1>

                    <p className="hero-subtitle">
                        Componentes de alto rendimiento de fabricantes confiables.
                        Mantené tu motor funcionando como nuevo con nuestro catálogo verificado.
                    </p>

                    <div className='hero-search-bar'>
                        <SearchBar handleSearch={handleSearch} query={query} setQuery={setQuery} placeholder="Buscar repuestos..." />
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-value">2000+</span>
                            <span className="hero-stat-label">REPUESTOS EN STOCK</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="hero-stat-value">100%</span>
                            <span className="hero-stat-label">PIEZAS ORIGINALES</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            <span className="hero-stat-value">Soporte <FaWhatsapp /></span>
                            <span className="hero-stat-label">SOPORTE VÍA WHATSAPP</span>
                        </div>
                    </div>
                </div>

                {/* Right image */}
                <div className="hero-image-wrapper">
                    <img
                        src="/src/assets/RpLogo.png"
                        alt="Peano repuestos logo"
                        className="hero-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <div className="hero-image-bg" />
                </div>
            </div>
        </section>
    );
}
