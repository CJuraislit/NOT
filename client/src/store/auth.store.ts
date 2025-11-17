import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const _useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (t) => set({ token: t }),
        logout: () => set({ token: null }),
      }),
      { name: 'auth', version: 1 },
    ),
  ),
);

export const useAuthStore = _useAuthStore;

export const authStoreGetToken = () => _useAuthStore.getState().token;
export const authStoreSetToken = (t: string | null) => _useAuthStore.getState().setToken(t);
export const authStoreLogout = () => _useAuthStore.getState().logout();
