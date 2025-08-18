import {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {baseUrl} from "../../constant";
import ProductCard from "../../components/ProductCard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("token", token);

    const result = await fetch(`${baseUrl}/getProducts.php`, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    if (data.success) {
      setProducts(data.data);
      console.log(data.data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (search) {
      setProducts(
        products.filter(
          (product) =>
            product.product_title
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            product.category_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.price.toString().includes(search)
        )
      );
    } else {
      getProducts();
    }
  }, [search]);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Search products{" "}
          </span>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "50%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
