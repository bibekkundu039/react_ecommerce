import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      login: async (values) => {
        try {
          const res = await axios.post(
            "http://localhost:8080/auth/login",
            values
          );
          toast.success("Login successful", { position: "top-center" });
          return set({ user: res.data });
        } catch (error) {
          console.error("Login failed:", error);
          toast.error("Login failed: " + error.response.data.message, {
            position: "top-center",
          });
          return set({
            user: null,
          });
        }
      },
      logout: () => {
        toast.info("Logged out successfully", { position: "top-center" });
        return set({
          user: null,
        });
      },
    }),
    { name: "auth" }
  )
);
