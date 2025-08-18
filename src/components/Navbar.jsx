import {FaShoppingCart} from "react-icons/fa";

const Navbar = () => {
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
        <div>
          <FaShoppingCart size={24} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
