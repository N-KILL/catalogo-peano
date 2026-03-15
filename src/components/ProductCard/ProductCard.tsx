import React from 'react';

// Icons
import { GrCart } from 'react-icons/gr';

// Css
import './ProductCard.css';

interface ProductCardProps {
    product: {
        code: string;
        name: string;
        brand: string;
        stock: number;
        category?: string;
        price?: number;
        image?: string | null;
    };
    buttonText?: string;
    showCartIcon: boolean;
    onButtonClick: () => void;
}

export function ProductCard({ product, onButtonClick, buttonText = "Ver en catálogo", showCartIcon }: ProductCardProps) {
    return (
        <div className="product-card">
            {/* Thumbnail */}
            <div className="product-card-image">
                {product.image ? (
                    <img src={product.image} alt={product.name} />
                ) : (
                    <div className="product-card-image-placeholder">
                        <GrCart />
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="product-card-body">
                {product.category && <span className="product-card-category">{product.category}</span>}
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-brand">{product.brand}</p>
                <p className="product-card-code">Código: {product.code}</p>
            </div>

            {/* Footer */}
            <div className="product-card-footer">
                <div className="product-stock-row">
                    <span
                        className={`product-card-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}
                    >
                        {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
                    </span>
                </div>
                <button
                    className="product-card-btn"
                    onClick={onButtonClick}
                >
                    {showCartIcon && <GrCart size={16} />}
                    {buttonText}
                </button>
            </div>
        </div>
    );
}