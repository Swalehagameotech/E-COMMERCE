import axios from 'axios';

const API_URL = 'https://ecomm-backend-3r05.onrender.com/api/orders';

// Create axios instance
const orderAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase UID to requests
orderAxios.interceptors.request.use(
  (config) => {
    const firebaseUID = localStorage.getItem('firebaseUID');
    if (firebaseUID) {
      config.headers['x-firebase-uid'] = firebaseUID;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Order API functions
export const orderAPI = {
  // Create order
  createOrder: async (items, totalPrice) => {
    try {
      const response = await orderAxios.post('/', {
        items,
        totalPrice,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get user orders
  getOrders: async () => {
    try {
      const response = await orderAxios.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
};

export default orderAPI;
