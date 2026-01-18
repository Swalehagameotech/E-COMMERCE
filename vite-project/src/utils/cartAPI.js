import axios from 'axios';

const API_URL = 'https://ecomm-backend-3r05.onrender.com/api';

// Create axios instance for cart API
const cartAxios = axios.create({
  baseURL: `${API_URL}/cart`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase UID to requests
cartAxios.interceptors.request.use(
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

// Cart API functions
export const cartAPI = {
  getCart: async () => {
    const response = await cartAxios.get('/');
    return response.data;
  },
  addToCart: async (product) => {
    const response = await cartAxios.post('/', {
      productId: product._id,
      name: product.name,
      price: product.discounted_price || product.price,
      quantity: 1,
      image: product.image,
    });
    return response.data;
  },
  updateCartItem: async (productId, quantity) => {
    const response = await cartAxios.put(`/${productId}`, { quantity });
    return response.data;
  },
  removeFromCart: async (productId) => {
    const response = await cartAxios.delete(`/${productId}`);
    return response.data;
  },
  clearCart: async () => {
    const response = await cartAxios.delete('/');
    return response.data;
  },
};

export default cartAPI;
