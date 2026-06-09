// src/store/authStore.ts

import { create } from "zustand";
import api from "../lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  fetchMe: async () => {
    const { data } = await api.get("/auth/me");

    set({
      user: data,
    });
  },

  logout: () =>
    set({
      user: null,
    }),
}));
