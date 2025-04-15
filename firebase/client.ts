// firebase client SDK (used on the client-side of the application to interact with Firebase services in a way that's safe for frontend code - signing in users, storing and retrieving data)
// safe to expose in frontend (public facing credentials), don't allow admin-level access
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjpgdR5qRKOuggdIj4jJrokemfUuQb20E",
  authDomain: "preptalk-92a7a.firebaseapp.com",
  projectId: "preptalk-92a7a",
  storageBucket: "preptalk-92a7a.firebasestorage.app",
  messagingSenderId: "493962333137",
  appId: "1:493962333137:web:650569669597baf196eef0",
  measurementId: "G-QSBZ4KJYNR",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
