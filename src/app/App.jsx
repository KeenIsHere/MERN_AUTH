import {useState} from "react";
import Login from "../pages/login/login";
import Register from "../pages/register/reigster";
import FlexExample from "../components/flex";
import {createBrowserRouter, RouterProvider} from "react-router";
import {Toaster} from "react-hot-toast";
import AddProductPage from "../pages/add-product/addProduct";
import HomePage from "../pages/home/HomePage";
import {CartProvider} from "../context/cartContext";
import ProductDetail from "../pages/product-detail/ProductDetail";

function App() {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <HomePage /> : <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/flex-example",
      element: <FlexExample />,
    },
    {
      path: "/add-product",
      element: <AddProductPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/products/:product_id",
      element: <ProductDetail />,
    },
    {
      path: "*",
      element: <span>404 Not Found</span>,
    },
  ]);

  return (
    <>
      <CartProvider>
        <Toaster />
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
