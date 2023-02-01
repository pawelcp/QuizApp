import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSHHSoAKuqTG7G9hpyc_evNvhHuefYyTc",
  authDomain: "fakeshop-a5c15.firebaseapp.com",
  projectId: "fakeshop-a5c15",
  storageBucket: "fakeshop-a5c15.appspot.com",
  messagingSenderId: "21695359296",
  appId: "1:21695359296:web:3487cfefb30cd949b0b2a5",
  measurementId: "G-23ZTBDC775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)