import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Log configuration
console.log('API Configuration:', {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check for admin token first, then regular user token
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('accessToken');
    
    if (adminToken) {
      console.log('Using admin token for request');
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (userToken) {
      console.log('Using user token for request');
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('API Error:', {
      config: originalRequest,
      response: error.response,
      error: error
    });

    // Handle network errors or server not responding
    if (!error.response) {
      console.error('Network Error:', error);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        originalError: error
      });
    }

    // Handle token expiration
    if (error.response.status === 401) {
      if (!originalRequest._retry && originalRequest.url !== '/auth/refresh-token') {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token Refresh Error:', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          return Promise.reject({
            message: 'Session expired. Please log in again.',
            originalError: refreshError
          });
        }
      }
    }

    // Handle specific error cases
    const enhancedError = {
      ...error,
      originalMessage: error.response?.data?.message,
      validationErrors: error.response?.data?.errors
    };

    // Log the error for debugging
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      errors: error.response?.data?.errors,
      url: error.config?.url
    });

    return Promise.reject(enhancedError);
  }
);

export default api;