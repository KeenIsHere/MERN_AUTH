import {useState} from "react";
import Login from "../pages/login/login";
import Register from "../pages/register/reigster";
import FlexExample from "../components/flex";
import {createBrowserRouter, RouterProvider} from "react-router";

function App() {
  const [count, setCount] = useState(1);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login count={count} setCount={setCount} />,
    },
    {
      path: "/login",
      element: <Login count={count} setCount={setCount} />,
    },
    {
      path: "/register",
      element: <Register setCount={setCount} />,
    },
    {
      path: "/flex-example",
      element: <FlexExample />,
    },
    {
      path: "*",
      element: <span>404 Not Found</span>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
