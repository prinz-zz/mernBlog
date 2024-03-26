// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-31740.firebaseapp.com",
  projectId: "mern-blog-31740",
  storageBucket: "mern-blog-31740.appspot.com",
  messagingSenderId: "1001813833020",
  appId: "1:1001813833020:web:2c0f1a6e97f10d34225a39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);