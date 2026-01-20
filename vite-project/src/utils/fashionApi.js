import axios from 'axios';

// Temporarily use local backend for testing
//const API_URL = 'http://localhost:5000/api/fashion';
 const API_URL = 'https://ecomm-backend-3r05.onrender.com/api/fashion';

// Create axios instance
const fashionApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fashion API functions
export const fashionAPI = {
  // Get all fashion with optional filters
  getFashion: async (params = {}) => {
    try {
      const response = await fashionApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching fashion:', error);
      throw error;
    }
  },

  // Get single fashion by ID
  getFashionById: async (id) => {
    try {
      const response = await fashionApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching fashion:', error);
      throw error;
    }
  },

  // Search fashion
  searchFashion: async (searchQuery) => {
    try {
      const response = await fashionApi.get('/', {
        params: { search: searchQuery }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching fashion:', error);
      throw error;
    }
  },

  // Filter fashion by category/subcategory
  filterByCategory: async (category) => {
    try {
      // Pass as subcategory parameter (backend checks subcategory first, then category)
      console.log('🔍 Fashion API - filterByCategory called with:', category);
      const response = await fashionApi.get('/', {
        params: { subcategory: category }
      });
      console.log('🔍 Fashion API - Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error filtering fashion:', error);
      throw error;
    }
  },

  // Seed fashion (for development)
  seedFashion: async () => {
    try {
      const response = await fashionApi.post('/seed');
      return response.data;
    } catch (error) {
      console.error('Error seeding fashion:', error);
      throw error;
    }
  }
};

export default fashionAPI;
