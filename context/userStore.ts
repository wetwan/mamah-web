import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
};

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);