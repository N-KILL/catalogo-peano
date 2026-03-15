import React, { createContext, useContext, useState } from 'react'

// Models
import { CartItem } from 'models/CartItem'

// Cart interface
interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string | number) => void
  updateQuantity: (productId: string | number, quantity: number) => void
  clearCart: () => void
  getCartCount: () => number
}

// Cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider props
interface CartProviderProps {
  children: React.ReactNode
}

// Cart provider
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Add to cart
  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.code === newItem.product.code)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.code === newItem.product.code
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prevCart, newItem]
    })
  }

  // Remove from cart
  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.code !== productId))
  }

  // Update quantity
  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.code === productId ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Use cart function
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside of the CartProvider')
  }
  return context
}
