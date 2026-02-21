import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const API_URL = API_ENDPOINTS.DISCOUNT;

const discountApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const discountAPI = {
  getDiscounts: async () => {
    try {
      const response = await discountApi.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching discount products:', error);
      throw error;
    }
  },

  getDiscountById: async (id) => {
    try {
      const response = await discountApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export default discountAPI;
