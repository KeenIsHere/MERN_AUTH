import {useContext} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {CartContext} from "../context/cartContext";

const Navbar = () => {
  const {cart} = useContext(CartContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 40px",
          backgroundColor: "var(--primary)",
          color: "white",
          height: "50px",
        }}
      >
        <div>
          <h1>E-Commerce</h1>
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <FaShoppingCart size={24} />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              borderRadius: "50%",
              height: "16px",
              aspectRatio: "1/1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "14px",
            }}
          >
            {cart.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
