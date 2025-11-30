import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "animate.css";
import "@ant-design/v5-patch-for-react-19";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/admin/Dashboard";
import AuthGuard from "./components/AuthGuard";
import Layout from "./components/admin/Layout";
import Customers from "./components/admin/Customers";
import Orders from "./components/admin/Orders";
import Products from "./components/admin/Products";
import Settings from "./components/admin/Settings";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AuthGuard />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "admin",
          element: <Layout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "customers",
              element: <Customers />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
          ],
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
