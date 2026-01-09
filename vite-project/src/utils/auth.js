// Auth utility functions

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const setUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};

export const logout = () => {
  removeToken();
  removeUserFromStorage();
};
