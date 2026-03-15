import React from 'react';

// Css
import './OurBrandsSection.css';

// Placeholder brand logos – swap these src paths for real logos later
const BRANDS = [
    { id: 'bosch', name: 'Bosch', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Bosch&font=montserrat' },
    { id: 'gates', name: 'Gates', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Gates&font=montserrat' },
    { id: 'brembo', name: 'Brembo', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Brembo&font=montserrat' },
    { id: 'monroe', name: 'Monroe', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Monroe&font=montserrat' },
    { id: 'ngk', name: 'NGK', logo: 'https://placehold.co/140x70/ffffff/38417F?text=NGK&font=montserrat' },
    { id: 'dayco', name: 'Dayco', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Dayco&font=montserrat' },
    { id: 'valeo', name: 'Valeo', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Valeo&font=montserrat' },
    { id: 'mahle', name: 'Mahle', logo: 'https://placehold.co/140x70/ffffff/38417F?text=Mahle&font=montserrat' },
];

export function OurBrandsSection() {
    // Duplicate the list so the infinite scroll feels seamless
    const track = [...BRANDS, ...BRANDS];

    return (
        <section className="brands-section">
            <div className="brands-header">
                <h2 className="brands-title">Nuestras marcas</h2>
                <p className="brands-subtitle">Trabajamos con las mejores marcas del mercado</p>
            </div>

            {/* Carousel viewport */}
            <div className="brands-viewport">
                {/* Fade edges */}
                <div className="brands-fade brands-fade--left" />
                <div className="brands-fade brands-fade--right" />

                <div className="brands-track">
                    {track.map((brand, i) => (
                        <div className="brand-slide" key={`${brand.id}-${i}`}>
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="brand-logo"
                                draggable={false}
                            />
                            <span className="brand-name">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
