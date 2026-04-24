import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  const lang = Cookies.get('lang') || 'en';
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  config.headers['Accept-Language'] = lang;
  
  return config;
});

export default apiClient;
