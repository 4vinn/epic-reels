// firebase client SDK (used on the client-side of the application to interact with Firebase services in a way that's safe for frontend code - signing in users, storing and retrieving data)
// safe to expose in frontend (public facing credentials), don't allow admin-level access
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHVyA8lCN0PH_PARK5vGafdnrbRWnE0DQ",
  authDomain: "epicreel.firebaseapp.com",
  projectId: "epicreel",
  storageBucket: "epicreel.firebasestorage.app",
  messagingSenderId: "531812335660",
  appId: "1:531812335660:web:a0753f950b2d26f16ad189",
  measurementId: "G-LSJQVF85HF",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
