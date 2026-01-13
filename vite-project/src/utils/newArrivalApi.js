import axios from 'axios';

const API_URL = 'http://localhost:5000/api/newarrival';

const newArrivalApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newArrivalAPI = {
  getNewArrivals: async () => {
    try {
      const response = await newArrivalApi.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  getNewArrivalById: async (id) => {
    try {
      const response = await newArrivalApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export default newArrivalAPI;
