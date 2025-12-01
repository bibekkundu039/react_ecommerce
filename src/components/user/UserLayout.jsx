import {
  AlignRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Bell,
  ShoppingCart,
  LogOutIcon,
  LayoutDashboardIcon,
  Axis3D,
  User,
  ShoppingBag,
  ListOrdered,
  Settings2,
} from "lucide-react";
import React, { useState } from "react";
import { Dropdown, Avatar, Badge, Popconfirm } from "antd";
import { href, Link, Outlet } from "react-router-dom";
import { useAuth } from "../../zustand/useAuth";

const UserLayout = () => {
  const [space, setSpace] = useState(270);
  const { logout } = useAuth();
  const items = [
    {
      key: "settings",
      label: "Settings",
      icon: <Settings className="size-4" />,
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogOut className="size-4" />,
    },
  ];

  const menus = [
    {
      label: "Carts",
      href: "/user/carts",
      icon: <User className="size-4" />,
    },
    {
      label: "Orders",
      href: "/user/orders",
      icon: <ListOrdered className="size-4" />,
    },
    {
      label: "Settings",
      href: "/user/settings",
      icon: <Settings2 className="size-4" />,
    },
  ];

  return (
    <div className="bg-[#F8F7F4] min-h-screen">
      {/* Sidebar */}
      <aside
        style={{ transition: "0.2s", width: space }}
        className={`overflow-x-hidden flex flex-col justify-between  fixed h-full top-0 left-0 bg-white border-r border-r-slate-200`}>
        <div className="flex items-center gap-2 h-16 border-b border-b-slate-200 py-5.5 px-6">
          <button className="bg-amber-500 text-white size-10 rounded-full flex items-center justify-center ">
            <ShoppingCart className="size-5" />
          </button>
          <h1 className="text-xl font-semibold">E-Commerce</h1>
        </div>

        <div className="flex flex-col w-full p-6 flex-1 gap-1">
          {menus.map((menu, index) => (
            <Link key={index} to={menu.href}>
              <button
                className="w-full rounded py-2 flex items-center px-2 gap-3 text-gray-600 font-medium cursor-pointers 
            hover:text-gray-800 hover:bg-gray-300 active:scale-95 duration-300 cursor-pointer">
                {menu.icon}
                {menu.label}
              </button>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 h-16 border-b border-b-slate-200 py-5.5 px-6">
          <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={logout}
            okText="Yes"
            cancelText="No">
            <button
              className="flex items-center justify-center gap-1 w-full py-2 
          bg-rose-500 font-medium text-sm text-white rounded-lg hover:scale-105 duration-300 active:scale-85 cursor-pointer">
              <LogOutIcon className="size-4 font-bold" />
              Logout
            </button>
          </Popconfirm>
        </div>
      </aside>
      {/* Content */}
      <section
        style={{ transition: "0.2s", marginLeft: space }}
        className="min-h-screen">
        <div className="sticky top-0 left-0 w-full bg-white py-4 px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSpace(space === 0 ? 270 : 0)}
              className="p-2 bg-gray-100 hover:bg-gray-200 active:scale-80 duration-300 rounded cursor-pointer">
              <AlignRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <Badge count={25} size="small" color="red">
              <Bell className="size-5 text-gray-500" />
            </Badge>
            <Dropdown menu={{ items }} placement="bottomCenter" arrow>
              <Avatar
                alt="Profile"
                className="size-large"
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </div>
        <div className="px-12 py-8">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default UserLayout;
