import axios from 'axios';

const API_URL = 'http://localhost:5000/api/discount';

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
