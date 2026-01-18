import axios from 'axios';

const API_URL = 'https://ecomm-backend-3r05.onrender.com/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
};

export default api;
