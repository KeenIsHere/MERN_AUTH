import {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {CartContext} from "../../context/cartContext";
import ProductCard from "../../components/ProductCard";
import CartCard from "../../components/CartCard";

function CartPage() {
  const {addToCart, cart} = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const deliveryFee = 100;

  function calculateTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          margin: "50px 0px",
        }}
      >
        {cart.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {cart.map((item) => (
              <CartCard product={item} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
              flexDirection: "column",
            }}
          >
            <h1>No items in cart</h1>
            <img
              style={{
                objectFit: "contain",
                width: "300px",
                aspectRatio: "1.5",
              }}
              src={"assets/empty-cart.png"}
              alt="No items in cart"
            />
          </div>
        )}
        {cart.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "300px",
              height: "100%",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
              zIndex: 100,
              position: "sticky",
              top: "80px",
            }}
          >
            <span style={{fontSize: "20px", fontWeight: "bold"}}>
              Cart Summary
            </span>
            <div
              style={{display: "flex", flexDirection: "column", gap: "10px"}}
            >
              <span style={{fontSize: "18px", fontWeight: "400"}}>
                Subtotal:{" "}
                {total.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "NPR",
                })}
              </span>
              <span style={{fontSize: "18px", fontWeight: "400"}}>
                Delivery Fee:{" "}
                {deliveryFee.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "NPR",
                })}
              </span>
              <span style={{fontSize: "18px", fontWeight: "500"}}>
                Grand Total:{" "}
                {(total + deliveryFee).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "NPR",
                })}
              </span>
              <button className="button" style={{width: "100%", flex: 1}}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
