import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../../zustand/useAuth";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .test("domain-check", "Email must be a valid gmail email", (value) => {
      if (value) {
        const domain = value.split("@")[1];
        return domain === "gmail.com";
      }
      return true;
    }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
});

const AdminLogin = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: login,
  });

  return (
    <div className="bg-[#F8F7F4] h-screen flex items-center justify-center animate__animated animate__fadeIn animate__slower">
      <div className="bg-white w-7/12 shadow-lg rounded-lg grid grid-cols-2">
        <img
          src="/images/admin-login.png"
          className="rounded-l-lg object-cover"
        />
        <div className="flex flex-col justify-center px-10 gap-6">
          <h1 className="text-gray-700 text-2xl font-semibold">Admin Login</h1>
          <form
            className="flex flex-col justify-between gap-3"
            onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1 ">
              <label
                className="block text-sm text-gray-800 font-semibold"
                htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                placeholder="example@mail.com"
                className="w-full text-sm border border-gray-300 p-2 rounded"
              />
              {formik.errors.email && (
                <small className="text-red-500">{formik.errors.email}</small>
              )}
            </div>
            <div className="flex flex-col gap-1 ">
              <label
                className="block text-sm text-gray-800 font-semibold"
                htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                placeholder="*********"
                className="w-full text-sm border border-gray-300 p-2 rounded"
              />
              {formik.errors.password && (
                <small className="text-red-500">{formik.errors.password}</small>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-sm font-semibold bg-[#13B77F] text-white p-2 cursor-pointer
              hover:bg-[#0f9b5b] rounded">
              Login
            </button>
          </form>

          <div>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="#" className="text-[#13B77F] font-semibold">
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-500">
              <Link to="#" className="text-[#13B77F] font-semibold">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
