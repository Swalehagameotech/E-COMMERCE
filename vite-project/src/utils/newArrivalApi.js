import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

const API_URL = API_ENDPOINTS.NEW_ARRIVAL;

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
