/**
 * Core User Interface
 */
export interface User {
  id: number;
  name: string | Record<string, string>;
  email: string;
  is_active: boolean;
  roles?: { id: number; name: string; slug: string }[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Standard API Response Wrapper
 */
export interface ApiResponse<T = any> {
  user?: User; // Specific for auth responses
  data?: T;
  message?: string;
  access_token?: string;
  token_type?: string;
  errors?: Record<string, string[]>;
}

/**
 * Language Configuration
 */
export interface LanguageOption {
  key: string;
  name: string;
  icon: string;
}

/**
 * Translation Structure
 */
export type Translations = Record<string, any>;
