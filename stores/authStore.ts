import { TokenPayload } from "@/models/TokenPayload";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  email: string;
  id: number;
  image: string;
  name: string;
  userType: string;
  isAuthenticated: boolean;
  setToken: (tokenPayload: TokenPayload) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      email: "",
      id: 0,
      image: "",
      name: "",
      userType: "",
      isAuthenticated: false,

      setToken: (tokenPayload: TokenPayload) =>
        set(() => ({
          email: tokenPayload.email,
          id: tokenPayload.id,
          image: tokenPayload.image,
          name: tokenPayload.name,
          userType: tokenPayload.userType,
          isAuthenticated: true,
        })),

      clearToken: () =>
        set(() => ({
          email: "",
          id: 0,
          image: "",
          name: "",
          userType: "",
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
