import {baseUrl} from "../constant";
import {FaCartPlus} from "react-icons/fa";

const ProductCard = ({product}) => {
  return (
    <div
      style={{
        padding: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
      }}
    >
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
        <FaCartPlus
          style={{
            fontSize: "20px",
            color: "green",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
