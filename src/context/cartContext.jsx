import {createContext, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({children}) => {
  const localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      toast.error("Product already in cart");
    } else {
      const newCart = [...cart, product];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Product added to cart");
    }
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter(
      (item) => item.product_id !== product.product_id
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
