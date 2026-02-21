import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const featuredProductApi = axios.create({
  baseURL: API_ENDPOINTS.FEATURED_PRODUCTS,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const featuredProductAPI = {
  getFeaturedProducts: async () => {
    try {
      const response = await featuredProductApi.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  getFeaturedProductById: async (id) => {
    try {
      const response = await featuredProductApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export default featuredProductAPI;
