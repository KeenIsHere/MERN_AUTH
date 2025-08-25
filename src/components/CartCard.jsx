import {useContext} from "react";
import {baseUrl} from "../constant";
import {FaCartPlus, FaTrash} from "react-icons/fa";
import {CartContext} from "../context/cartContext";
import {Link} from "react-router";

const CartCard = ({product}) => {
  const {updateCart, removeFromCart} = useContext(CartContext);

  return (
    <Link
      to={`/products/${product.product_id}`}
      style={{
        textDecoration: "none",
        color: "black",
        width: "100%",
        maxWidth: "512px",
      }}
    >
      <div
        style={{
          padding: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          display: "flex",
          flex: 1,
          width: "100%",
          position: "relative",
        }}
      >
        <div style={{position: "absolute", top: 10, right: 10}}>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              removeFromCart(product);
            }}
          >
            <FaTrash size={20} color="red" />
          </button>
        </div>

        <div
          style={{
            width: "250px",
            height: "200px,",
          }}
        >
          <img
            src={`${baseUrl}/${product.image_url}`}
            alt={product.product_title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <div>
            <span>{product.product_title}</span>
            <p
              style={{
                fontSize: "12px",
                color: "gray",
              }}
            >
              {product.category_name.toUpperCase()}
            </p>
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>
              {Number(product.price).toLocaleString("en-IN", {
                style: "currency",
                currency: "NPR",
              })}
            </span>
            {/* <FaCartPlus
              style={{
                fontSize: "20px",
                color: "green",
                cursor: "pointer",
              }}
              onClick={(e) => {
                addToCart({
                  ...product,
                  quantity: 1,
                });
                e.preventDefault();
              }}
            /> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "10px 0",
            }}
          >
            <button
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (product.quantity > 1) {
                  updateCart({
                    ...product,
                    quantity: product.quantity - 1,
                  });
                } else {
                  toast.error("Minimum quantity is 1");
                }
              }}
            >
              -
            </button>
            <span style={{fontSize: "20px", fontWeight: "500"}}>
              {product.quantity}
            </span>
            <button
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (product.quantity < 10) {
                  updateCart({
                    ...product,
                    quantity: product.quantity + 1,
                  });
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartCard;
