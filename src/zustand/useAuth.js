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
      login: async (values) => {
        try {
          const res = await axios.post("/auth/login", values);
          toast.success("Login successful", { position: "top-center" });
          set({ user: res.data });
          setTimeout(() => {
            window.location.replace("/admin/dashboard");
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
      },
    }),
    { name: "auth" }
  )
);
