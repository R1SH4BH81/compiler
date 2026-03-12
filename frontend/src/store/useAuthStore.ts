import { create } from 'zustand';
import axios from 'axios';
import { API_BASE_URL } from '../types';

interface User {
  id: number;
  email: string;
  has_api_key: boolean;
  created_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: true,

  login: (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    set({ token: newToken });
    get().refreshUser();
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, user: null });
  },

  refreshUser: async () => {
    const { token } = get();
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ user: response.data, loading: false });
    } catch (error) {
      console.error('Auth error:', error);
      get().logout();
      set({ loading: false });
    }
  },

  initialize: async () => {
    await get().refreshUser();
  }
}));
