import React from 'react';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import './TrustBar.css';

const TRUST_ITEMS = [
    {
        icon: <FiTruck />,
        title: 'Envío Rápido',
        desc: 'Entrega sin cargo a partir de $200',
    },
    {
        icon: <FiShield />,
        title: 'Calidad OEM',
        desc: '100% componentes genuinos',
    },
    {
        icon: <FiRefreshCw />,
        title: 'Devoluciones en 30 días',
        desc: 'Cambio sin inconvenientes',
    },
    {
        icon: <FiHeadphones />,
        title: 'Soporte Experto',
        desc: 'Asistencia técnica 24/7',
    },
];

export function TrustBar() {
    return (
        <section className="trust-section">
            <div className="trust-container">
                {TRUST_ITEMS.map((item, i) => (
                    <React.Fragment key={i}>
                        <div className="trust-item">
                            <div className="trust-icon">{item.icon}</div>
                            <div className="trust-text">
                                <span className="trust-title">{item.title}</span>
                                <span className="trust-desc">{item.desc}</span>
                            </div>
                        </div>
                        {i < TRUST_ITEMS.length - 1 && (
                            <div className="trust-divider" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
