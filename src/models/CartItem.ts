import { Product } from "./Product"

// Cart item interface, is used on the cart, 
// shows the product and the quantity of it
export interface CartItem {
  product: Product
  quantity: number
}
