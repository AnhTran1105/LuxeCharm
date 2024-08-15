// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "luxecharm.firebaseapp.com",
  projectId: "luxecharm",
  storageBucket: "luxecharm.appspot.com",
  messagingSenderId: "597166590033",
  appId: "1:597166590033:web:d19c14cb05f097f60a1070",
};

export const app = initializeApp(firebaseConfig);
