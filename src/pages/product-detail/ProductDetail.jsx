import React, {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {baseUrl} from "../../constant";
import {useParams} from "react-router";
import toast from "react-hot-toast";
import {CartContext} from "../../context/cartContext";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {addToCart, cart} = useContext(CartContext);

  async function getProduct() {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("token", token);
    formData.append("product_id", params.product_id);

    const result = await fetch(`${baseUrl}/getSingleProduct.php`, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    if (data.success) {
      setProduct(data.data);
      console.log(data.data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Navbar />
      {product && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "70px",
          }}
        >
          <img
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
            }}
            src={`${baseUrl}/${product.image_url}`}
            alt={product.product_title}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>{product.product_title}</h1>
            <p>{product.description}</p>
            <p>
              {Number(product.price).toLocaleString("en-US", {
                style: "currency",
                currency: "NPR",
              })}
            </p>

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
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else {
                    toast.error("Minimum quantity is 1");
                  }
                }}
              >
                -
              </button>
              <span style={{fontSize: "20px", fontWeight: "500"}}>
                {quantity}
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
                onClick={() => {
                  if (quantity < 10) {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart({
                  ...product,
                  quantity: quantity,
                });
              }}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
