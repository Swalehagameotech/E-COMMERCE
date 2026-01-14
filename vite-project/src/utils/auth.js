// Auth utility functions (Firebase-based)

export const getToken = () => {
  return localStorage.getItem('firebaseUID');
};

export const setToken = (token) => {
  localStorage.setItem('firebaseUID', token);
};

export const removeToken = () => {
  localStorage.removeItem('firebaseUID');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('firebaseUID');
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

export const getFirebaseUID = () => {
  return localStorage.getItem('firebaseUID');
};
