// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnoDKKRZ2dZyFOM4w566vjOH4EFUC05FY",
  authDomain: "e-commerce-c160f.firebaseapp.com",
  projectId: "e-commerce-c160f",
  storageBucket: "e-commerce-c160f.firebasestorage.app",
  messagingSenderId: "830997972492",
  appId: "1:830997972492:web:4cd992e00050e2ed4c1029",
  measurementId: "G-C9TR9J81WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();