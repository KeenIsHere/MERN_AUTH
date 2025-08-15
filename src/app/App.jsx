import {useState} from "react";
import Login from "../pages/login/login";
import Register from "../pages/register/reigster";
import FlexExample from "../components/flex";
import {createBrowserRouter, RouterProvider} from "react-router";
import {Toaster} from "react-hot-toast";
import AddProductPage from "../pages/add-product/addProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
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
      path: "*",
      element: <span>404 Not Found</span>,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
