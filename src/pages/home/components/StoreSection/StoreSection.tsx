import React from 'react';

// Icons
import { FiMapPin, FiClock, FiPhone } from 'react-icons/fi';

// Css
import './StoreSection.css';

//TODO: Hacer que esta informacion se pueda cambiar facil desde el backend,
// como horario y direccion por las dudas

export function StoreSection() {
    return (
        <section className="store-section">
            <div className="store-container">
                <div className="store-info">
                    <h2 className="store-title">Visitanos en nuestro local</h2>
                    <div className="store-details">
                        <div className="detail-item">
                            <div className="icon-wrapper">
                                <FiMapPin color='var(--primary-color)' size={28} />
                            </div>
                            <div className="detail-text">
                                <h3>Ubicacion</h3>
                                <p>Juan José Castelli 1370, X5800 Río Cuarto, Córdoba</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="icon-wrapper">
                                <FiClock color='var(--primary-color)' size={28} />
                            </div>
                            <div className="detail-text">
                                <h3>Horarios </h3>
                                <p>Lunes a Viernes: 8:00- 12:00 y 15:30- 19:30</p>
                                <p>Sabados: 8:30- 12:00</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="icon-wrapper">
                                <FiPhone color='var(--primary-color)' size={28} />
                            </div>
                            <div className="detail-text">
                                <h3>Contacto </h3>
                                <p>
                                    <a href="https://wa.me/5493585188228" target="_blank" rel="noopener noreferrer">
                                        +54 358 518-8228
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:peanorepuestos@gmail.com" target="_blank" rel="noopener noreferrer">
                                        peanorepuestos@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="store-map">
                    <div className="map-container">
                        <div className="map-embed-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.8600959606183!2d-64.37645952432081!3d-33.139039881631895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d201a17aad0e4f%3A0x95b632e41536a390!2sPeano%20Repuestos!5e0!3m2!1ses-419!2sar!4v1772693161762!5m2!1ses-419!2sar"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '4px' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Store Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
