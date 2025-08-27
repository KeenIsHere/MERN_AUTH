import {createContext, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCart: () => {},
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

  const updateCart = (product) => {
    const newCart = cart.map((item) =>
      item.product_id === product.product_id ? product : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Cart updated");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{cart, addToCart, removeFromCart, clearCart, updateCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
