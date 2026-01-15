import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Create axios instance
const adminAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase UID to requests
adminAxios.interceptors.request.use(
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

// Admin API functions
export const adminAPI = {
  // Dashboard
  getDashboard: async () => {
    try {
      const response = await adminAxios.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      throw error;
    }
  },

  // Products
  getAllProducts: async () => {
    try {
      const response = await adminAxios.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await adminAxios.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async (productId, category, productData) => {
    try {
      const response = await adminAxios.put(`/products/${productId}`, {
        category,
        ...productData,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId, category) => {
    try {
      const response = await adminAxios.delete(`/products/${productId}`, {
        data: { category },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Orders
  getAllOrders: async () => {
    try {
      const response = await adminAxios.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await adminAxios.put(`/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Users
  getAllUsers: async () => {
    try {
      const response = await adminAxios.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await adminAxios.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Deleted Products
  getDeletedProducts: async () => {
    try {
      const response = await adminAxios.get('/deleted-products');
      return response.data;
    } catch (error) {
      console.error('Error fetching deleted products:', error);
      throw error;
    }
  },

  restoreProduct: async (deletedProductId) => {
    try {
      const response = await adminAxios.post(`/restore-product/${deletedProductId}`);
      return response.data;
    } catch (error) {
      console.error('Error restoring product:', error);
      throw error;
    }
  },
};

export default adminAPI;
