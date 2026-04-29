import { create } from 'zustand';
import Cookies from 'js-cookie';
import apiClient from './apiClient';
import { User, ApiResponse } from './types';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (formData: any) => Promise<any>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!Cookies.get('auth_token'),
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<ApiResponse>('/auth/login', credentials);
      // Handle potential 'data' wrapping from backend Response helper
      const data = response.data.data || response.data;
      
      if (data.access_token) {
        Cookies.set('auth_token', data.access_token, { expires: 7 });
        set({ user: data.user || null, isAuthenticated: true });
        toast.success(data.message || 'Login successful');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid credentials';
      toast.error(message);
      
      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((err: any) => {
          if (Array.isArray(err)) err.forEach(msg => toast.error(msg));
          else toast.error(err);
        });
      }
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (formData) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<ApiResponse>('/auth/register', formData);
      const data = response.data.data || response.data;
      toast.success(data.message || 'Registration successful! Welcome champion.');
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);

      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((err: any) => {
          if (Array.isArray(err)) err.forEach(msg => toast.error(msg));
          else toast.error(err);
        });
      }
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      Cookies.remove('auth_token');
      set({ user: null, isAuthenticated: false });
    }
  },

  fetchUser: async () => {
    if (!Cookies.get('auth_token')) return;
    set({ isLoading: true });
    try {
      const response = await apiClient.get<ApiResponse>('/auth/me');
      const data = response.data.data || response.data;
      set({ user: data.user || null, isAuthenticated: true });
    } catch (error) {
      Cookies.remove('auth_token');
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
