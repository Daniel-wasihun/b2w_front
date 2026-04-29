import { create } from 'zustand';
import apiClient from './apiClient';

interface PageState {
  landingData: any | null;
  programsPageData: any | null;
  aboutPageData: any | null;
  galleryData: any | null;
  isLoading: boolean;
  error: string | null;

  fetchLandingData: () => Promise<void>;
  fetchProgramsPageData: () => Promise<void>;
  fetchAboutPageData: () => Promise<void>;
  fetchGalleryData: () => Promise<void>;
}

export const usePageStore = create<PageState>((set) => ({
  landingData: null,
  programsPageData: null,
  aboutPageData: null,
  galleryData: null,
  isLoading: false,
  error: null,

  fetchLandingData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/v1/landing');
      set({ landingData: response.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchProgramsPageData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/v1/programs-page');
      set({ programsPageData: response.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAboutPageData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/v1/about-page');
      set({ aboutPageData: response.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchGalleryData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/v1/gallery');
      set({ galleryData: response.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
