import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trending';

const trendingApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trendingAPI = {
  getTrending: async () => {
    try {
      const response = await trendingApi.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw error;
    }
  },

  getTrendingById: async (id) => {
    try {
      const response = await trendingApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export default trendingAPI;
