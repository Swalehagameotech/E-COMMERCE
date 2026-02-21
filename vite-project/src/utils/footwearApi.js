import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const API_URL = API_ENDPOINTS.FOOTWEAR;

// Create axios instance
const footwearApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Footwear API functions
export const footwearAPI = {
  // Get all footwear with optional filters
  getFootwear: async (params = {}) => {
    try {
      const response = await footwearApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching footwear:', error);
      throw error;
    }
  },

  // Get single footwear by ID
  getFootwearById: async (id) => {
    try {
      const response = await footwearApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching footwear:', error);
      throw error;
    }
  },

  // Search footwear
  searchFootwear: async (searchQuery) => {
    try {
      const response = await footwearApi.get('/', {
        params: { search: searchQuery }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching footwear:', error);
      throw error;
    }
  },

  // Filter footwear by category/subcategory
  filterByCategory: async (category) => {
    try {
      // Pass as both category and subcategory to ensure backend accepts it
      const response = await footwearApi.get('/', {
        params: { category, subcategory: category }
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering footwear:', error);
      throw error;
    }
  },

  // Seed footwear (for development)
  seedFootwear: async () => {
    try {
      const response = await footwearApi.post('/seed');
      return response.data;
    } catch (error) {
      console.error('Error seeding footwear:', error);
      throw error;
    }
  }
};

export default footwearAPI;
