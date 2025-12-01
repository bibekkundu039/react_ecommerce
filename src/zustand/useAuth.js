const env = import.meta.env;
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.baseURL = env.VITE_SERVER_URL;

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      signup: async (values) => {
        try {
          const res = await axios.post("/auth/signup", values);
          toast.success("Signup successful", { position: "top-center" });
          set({ user: res.data });
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
          console.log("Signup successful:", res.data);
        } catch (error) {
          toast.error("Signup failed: " + error.response.data.message, {
            position: "top-center",
          });
        }
      },
      login: async (values) => {
        try {
          const res = await axios.post("/auth/login", values);
          set({ user: res.data });
          toast.success("Login successful", { position: "top-center" });
          setTimeout(() => {
            if (res.data.role === "admin")
              window.location.replace("/admin/dashboard");
            else window.location.replace("/");
          }, 2000);
        } catch (error) {
          console.error("Login failed:", error);
          toast.error("Login failed: " + error.response.data.message, {
            position: "top-center",
          });
          set({ user: null });
        }
      },
      logout: () => {
        toast.info("Logged out successfully", { position: "top-center" });
        set({ user: null });
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      },
    }),
    { name: "auth" }
  )
);
