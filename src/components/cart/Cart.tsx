import React, { useState, useRef, useEffect } from 'react';

// Provider
import { useCart } from 'context/CartContext';

// Icons
import { GrCart, GrTrash } from "react-icons/gr";

// Css
import './Cart.css';

export function CartWidget() {
    const { cart, getCartCount, removeFromCart, updateQuantity, clearCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar-cart" ref={cartRef}>
            <button
                className="cart-button"
                onClick={() => setIsCartOpen(!isCartOpen)}
            >
                <GrCart />
                {getCartCount() > 0 && (
                    <span className="cart-badge">{getCartCount()}</span>
                )}
            </button>

            {isCartOpen && (
                <div className="cart-dropdown">
                    <h3>Mi Carrito</h3>
                    {cart.length === 0 ? (
                        <div className="empty-cart">El carrito está vacío</div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.product.code} className="cart-item">
                                        <div className="cart-item-info">
                                            <span className="cart-item-name">{item.product.name}</span>
                                            <span className="cart-item-brand">{item.product.brand}</span>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.product.code, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="item-quantity">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.product.code, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.product.code)}
                                                title="Eliminar producto"
                                            >
                                                <GrTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-footer">
                                <button className="clear-cart-btn" onClick={clearCart}>
                                    Vaciar Carrito
                                </button>
                                <button className="checkout-btn">
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
