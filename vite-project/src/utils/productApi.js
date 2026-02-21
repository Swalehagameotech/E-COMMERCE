import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const API_URL = API_ENDPOINTS.PRODUCTS;

// Create axios instance
const productApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API functions
export const productAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    try {
      const response = await productApi.get('/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await productApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchQuery) => {
    try {
      const response = await productApi.get('/', {
        params: { search: searchQuery }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Filter products by category/subcategory
  filterByCategory: async (category) => {
    try {
      // Pass as both category and subcategory to ensure backend accepts it
      const response = await productApi.get('/', {
        params: { category, subcategory: category }
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering products:', error);
      throw error;
    }
  },

  // Seed products (for development)
  seedProducts: async () => {
    try {
      const response = await productApi.post('/seed');
      return response.data;
    } catch (error) {
      console.error('Error seeding products:', error);
      throw error;
    }
  }
};

export default productAPI;
