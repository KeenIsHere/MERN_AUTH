import {useEffect, useState} from "react";
import {Link} from "react-router";
import {baseUrl} from "../../constant";
import toast from "react-hot-toast";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    product_title: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const [categories, setCategories] = useState([]);

  const addProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("token", token);
    form.append("product_name", formData.product_title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category_id", formData.category);
    form.append("image", formData.image);

    const result = await fetch(`${baseUrl}/addProduct.php`, {
      method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      body: form,
    });

    const data = await result.json();

    if (data.success) {
      toast.success(data.message);
      setFormData({
        product_title: "",
        description: "",
        price: "",
        image: null,
        category: "",
      });
    } else {
      toast.error(data.message);
    }
  };

  async function getCategories() {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("token", token);

    const result = await fetch(`${baseUrl}/getCategories.php`, {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    if (data.success) {
      setCategories(data.data);
      console.log(data.data);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {" "}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f0f0f0",
          padding: "10px",
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={addProduct}
          style={{
            display: "flex",
            maxWidth: "400px",
            width: "100%",
            height: "100%",
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <span
              style={{color: "#333", fontSize: "1.8em", fontWeight: "bold"}}
            >
              Add Product
            </span>
            <span style={{color: "#333", fontSize: "1.2em"}}>
              Enter your product details
            </span>
          </div>
          <input
            required
            value={formData.product_title}
            onChange={(e) =>
              setFormData({
                ...formData,
                product_title: e.target.value,
              })
            }
            className="input"
            type="text"
            placeholder="Enter your product title"
          />
          <textarea
            required
            className="input text-area"
            type="textarea"
            placeholder="Enter your product description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
          <input
            required
            className="input"
            type="number"
            min={5}
            placeholder="Enter your product price"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
          />
          <select
            required
            className="input select"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <input
            required
            className="input"
            type="file"
            multiple={false}
            accept="image/*"
            placeholder="Select your product image"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
          />
          <button className="button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
