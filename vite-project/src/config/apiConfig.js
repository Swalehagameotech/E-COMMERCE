// API Configuration
// Uses environment variable in production, falls back to localhost in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URL = API_BASE_URL;
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  FOOTWEAR: `${API_BASE_URL}/api/footwear`,
  FASHION: `${API_BASE_URL}/api/fashion`,
  OTHERS: `${API_BASE_URL}/api/others`,
  FEATURED_PRODUCTS: `${API_BASE_URL}/api/featuredproducts`,
  CART: `${API_BASE_URL}/api/cart`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  ADDRESS: `${API_BASE_URL}/api/address`,
  ADMIN: `${API_BASE_URL}/api/admin`,
};

export default API_BASE_URL;
