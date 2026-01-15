import { Avatar, Badge, Dropdown, Popconfirm } from "antd";
import {
  BadgeIndianRupee,
  Home,
  LogIn,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../zustand/useAuth";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

const menus = [
  {
    label: "Home",
    link: "/",
    icon: <Home className="size-4" />,
  },
  {
    label: "Checkout",
    link: "/user/checkout",
    icon: <BadgeIndianRupee className="size-4" />,
  },
];

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { data } = useSWR("/cart", fetcher, {
    revalidateOnFocus: false,
  });

  console.log("data", data);

  const items = [
    {
      key: "settings",
      label: <Link to="/user/settings">Settings</Link>,
      icon: <Settings className="size-4" />,
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Are you sure you want to logout?"
          onConfirm={logout}
          okText="Yes"
          cancelText="No">
          Logout
        </Popconfirm>
      ),
      icon: <LogOut className="size-4" />,
    },
  ];
  return (
    <div>
      <nav className="bg-white shadow-lg p-2">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img src="/images/ecom-logo.png" className="h-12" alt="logo" />
          </Link>
          <div className="flex items-center">
            {menus.map((menu, index) => (
              <Link
                key={index}
                to={menu.link}
                className="flex items-center gap-1 px-6 py-2 text-gray-700 hover:bg-gray-200">
                {menu.icon}
                {menu.label}
              </Link>
            ))}

            <Link
              to="/user/carts"
              className="flex items-center gap-2 px-6 py-2 text-gray-700 hover:bg-gray-200">
              <Badge count={data?.length} className="flex items-center size-4">
                <span className="flex items-center justify-center">
                  <ShoppingCart className="size-5" />
                </span>
              </Badge>
              <span>Carts</span>
            </Link>

            <div className="ml-6">
              {user ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomCenter"
                  className="animate__animated animate__fadeIn"
                  arrow>
                  <Avatar
                    alt="Profile"
                    className="size-large"
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                    style={{ cursor: "pointer" }}
                  />
                </Dropdown>
              ) : (
                <Link
                  to={"/login"}
                  className="flex items-center gap-1 bg-gradient-to-r from-cyan-300 to-blue-800 text-white 
              hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-200 transition duration-300
              hover:scale-105 active:scale-95
              px-4 py-2 text-sm rounded cursor-pointer animate__animated animate__fadeIn">
                  <LogIn className="size-3" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <div>Footer</div>
    </div>
  );
};

export default MainLayout;
