import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Components
import { ProductCard } from 'components/ProductCard/ProductCard';

// Css
import './FeaturedProducts.css';

// Mock featured products matching the existing product structure
const FEATURED = [
    {
        code: '06/016/187',
        name: 'Faro Delantero Polo Ámbar Derecho',
        brand: 'WW',
        category: 'Iluminación',
        price: 45000,
        stock: 10,
        image: "https://http2.mlstatic.com/D_NQ_NP_939560-MLA107427142487_022026-O.webp",
    },
    {
        code: '03/016/398',
        name: 'Faro Trasero Corsa II c/Retro Izquierdo',
        brand: 'Chevrolet',
        category: 'Iluminación',
        price: 38900,
        stock: 1,
        image: "https://http2.mlstatic.com/D_NQ_NP_940060-MLA43776131267_102020-O.webp",
    },
    {
        code: '06/016/188',
        name: 'Faro Delantero Polo Ámbar Izquierdo',
        brand: 'WW',
        category: 'Iluminación',
        price: 45000,
        stock: 5,
        image: null as string | null,
    },
    {
        code: 'AB39/2116A563AC',
        name: 'Pasarueda Delantero Izquierdo Ranger 12+',
        brand: 'Ford',
        category: 'Carrocería',
        price: 72000,
        stock: 0,
        image: "https://http2.mlstatic.com/D_NQ_NP_813302-MLA44371060385_122020-O.webp",
    },
    {
        code: '06/016/1887',
        name: 'Faro Delantero Polo Ámbar Derecho',
        brand: 'WW',
        category: 'Iluminación',
        price: 45000,
        stock: 10,
        image: "https://http2.mlstatic.com/D_NQ_NP_939560-MLA107427142487_022026-O.webp",
    },
    {
        code: '03/016/3988',
        name: 'Faro Trasero Corsa II c/Retro Izquierdo',
        brand: 'Chevrolet',
        category: 'Iluminación',
        price: 38900,
        stock: 1,
        image: "https://http2.mlstatic.com/D_NQ_NP_940060-MLA43776131267_102020-O.webp",
    },
    {
        code: '06/016/1888',
        name: 'Faro Delantero Polo Ámbar Izquierdo',
        brand: 'WW',
        category: 'Iluminación',
        price: 45000,
        stock: 5,
        image: null as string | null,
    },
    {
        code: 'AB39/2116A563A',
        name: 'Pasarueda Delantero Izquierdo Ranger 12+',
        brand: 'Ford',
        category: 'Carrocería',
        price: 72000,
        stock: 0,
        image: "https://http2.mlstatic.com/D_NQ_NP_813302-MLA44371060385_122020-O.webp",
    },
];

export function FeaturedProducts() {
    const navigate = useNavigate();
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const containerWidth = carouselRef.current.clientWidth;
            // Scroll by roughly the container width to show the next set of items
            const scrollAmount = Math.max(containerWidth * 0.8, 200);
            
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="featured-section">
            <div className="featured-container">
                {/* Header */}
                <div className="featured-header">
                    <div>
                        <h2 className="featured-title">Productos Destacados</h2>
                        <p className="featured-subtitle">
                            Los repuestos más populares y buscados por nuestros clientes.
                        </p>
                    </div>
                    
                    <div className="featured-actions">
                        <button
                            className="featured-view-all"
                            onClick={() => navigate('/catalogo')}
                        >
                            Ver catálogo completo <FiArrowRight />
                        </button>
                    </div>
                </div>

                {/* Cards Carousel */}
                <div className="carousel-wrapper">
                    <button 
                        className="carousel-nav-btn prev" 
                        onClick={() => scroll('left')}
                        aria-label="Anterior"
                    >
                        <FiChevronLeft size={24} />
                    </button>

                    <div className="featured-carousel" ref={carouselRef}>
                        {FEATURED.map((product) => (
                            <div key={product.code} className="carousel-item">
                                <ProductCard
                                    product={product}
                                    onButtonClick={() => navigate('/catalogo')}
                                    buttonText="Ver en catálogo"
                                    showCartIcon={false}
                                />
                            </div>
                        ))}
                    </div>

                    <button 
                        className="carousel-nav-btn next" 
                        onClick={() => scroll('right')}
                        aria-label="Siguiente"
                    >
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
