import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

interface AuthState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => Promise<void>;
  setUser: (user: User) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setToken: async (token: string) => set({ token }),
      setUser: async (user: User) => set({ user }),
      logout: () => {
        if (get().token) {
          set({ user: null, token: null });
        }
      }
    }),
    { name: 'auth-store' }
  )
);
