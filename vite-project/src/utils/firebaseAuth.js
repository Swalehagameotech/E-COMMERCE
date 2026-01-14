import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance for Firebase auth
const firebaseAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sign up with email and password
export const signUpWithEmail = async (email, password, name) => {
  try {
    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Create user in MongoDB
    const response = await firebaseAPI.post('/firebase-user', {
      firebaseUID: firebaseUser.uid,
      email: firebaseUser.email,
      name: name || firebaseUser.email?.split('@')[0],
    });

    if (response.data.success) {
      // Store user info
      localStorage.setItem('firebaseUID', firebaseUser.uid);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return { success: true, user: response.data.data.user };
    }

    return { success: false, error: 'Failed to create user in database' };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign up',
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get or create user in MongoDB
    const response = await firebaseAPI.post('/firebase-user', {
      firebaseUID: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
    });

    if (response.data.success) {
      localStorage.setItem('firebaseUID', firebaseUser.uid);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return { success: true, user: response.data.data.user };
    }

    return { success: false, error: 'User not found. Please signup first.' };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Failed to login',
    };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Sign in with Google
    const userCredential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = userCredential.user;

    // Get or create user in MongoDB
    const response = await firebaseAPI.post('/firebase-user', {
      firebaseUID: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
    });

    if (response.data.success) {
      localStorage.setItem('firebaseUID', firebaseUser.uid);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return { success: true, user: response.data.data.user };
    }

    return { success: false, error: 'Failed to authenticate' };
  } catch (error) {
    console.error('Google signin error:', error);
    return {
      success: false,
      error: error.message || 'Failed to sign in with Google',
    };
  }
};

// Sign out
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('firebaseUID');
    localStorage.removeItem('user');
    return { success: true };
  } catch (error) {
    console.error('Signout error:', error);
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentFirebaseUser = () => {
  return auth.currentUser;
};

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is authenticated
export const isFirebaseAuthenticated = () => {
  return !!localStorage.getItem('firebaseUID');
};

// Get Firebase UID from storage
export const getFirebaseUID = () => {
  return localStorage.getItem('firebaseUID');
};
