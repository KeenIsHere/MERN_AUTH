import {useContext} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {CartContext} from "../context/cartContext";
import {CiLogout} from "react-icons/ci";
import {Link, useNavigate} from "react-router";

const Navbar = () => {
  const {cart} = useContext(CartContext);
  const navigate = useNavigate();
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
        <Link
          style={{
            textDecoration: "none",
            color: "white",
          }}
          to="/"
        >
          <div>
            <h1>E-Commerce</h1>
          </div>
        </Link>

        <div style={{display: "flex", alignItems: "center", gap: "50px"}}>
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
          <CiLogout
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("cart");
              navigate("/login", {
                replace: true,
              });
            }}
            style={{
              cursor: "pointer",
            }}
            size={28}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
