import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

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

  // Filter products by category
  filterByCategory: async (category) => {
    try {
      const response = await productApi.get('/', {
        params: { category }
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
