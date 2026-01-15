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
import ErrorPage from "./components/ErrorPage";
import Signup from "./components/Signup";
import Home from "./components/Home";
import UserLayout from "./components/user/UserLayout";
import UserCarts from "./components/user/Carts";
import UserOrders from "./components/user/UserOrders";
import UserSettings from "./components/user/UserSettings";
import MainLayout from "./components/MainLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      element: <AuthGuard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
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

        {
          path: "user",
          element: <UserLayout />,
          children: [
            {
              path: "carts",
              element: <UserCarts />,
            },
            {
              path: "orders",
              element: <UserOrders />,
            },
            {
              path: "settings",
              element: <UserSettings />,
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
