import {createContext, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      toast.error("Product already in cart");
    } else {
      setCart([...cart, product]);
      toast.success("Product added to cart");
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
