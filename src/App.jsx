import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "animate.css";
import "@ant-design/v5-patch-for-react-19";
import AdminLogin from "./components/admin/AdminLogin";
import { ToastContainer } from "react-toastify";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "admin",
      children: [
        {
          path: "login",
          element: <AdminLogin />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
