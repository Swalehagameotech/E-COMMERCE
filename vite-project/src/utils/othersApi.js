import axios from 'axios';

// Temporarily use local backend for testing
const API_URL = 'http://localhost:5000/api/others';
// const API_URL = 'https://ecomm-backend-3r05.onrender.com/api/others';

// Create axios instance
const othersApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Others API functions
export const othersAPI = {
  // Get all others products with optional filters
  getOthers: async (params = {}) => {
    try {
      const response = await othersApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching others products:', error);
      throw error;
    }
  },

  // Get single others product by ID
  getOthersById: async (id) => {
    try {
      const response = await othersApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching others product:', error);
      throw error;
    }
  },

  // Search others products
  searchOthers: async (searchQuery, subcategory = null) => {
    try {
      const params = { search: searchQuery };
      if (subcategory) {
        params.subcategory = subcategory;
      }
      const response = await othersApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching others products:', error);
      throw error;
    }
  },

  // Filter others products by subcategory
  filterBySubcategory: async (subcategory) => {
    try {
      const response = await othersApi.get('/', {
        params: { subcategory }
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering others products:', error);
      throw error;
    }
  },

  // Seed others products (for development)
  seedOthers: async () => {
    try {
      const response = await othersApi.post('/seed');
      return response.data;
    } catch (error) {
      console.error('Error seeding others products:', error);
      throw error;
    }
  }
};

export default othersAPI;
