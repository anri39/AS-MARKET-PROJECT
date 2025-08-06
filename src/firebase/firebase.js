// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Authentication (if using)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfHouI-UZ0qYjW_9tpFa-gGfV9kExzWKc",
  authDomain: "as-market-78929.firebaseapp.com",
  projectId: "as-market-78929",
  storageBucket: "as-market-78929.firebasestorage.app",
  messagingSenderId: "1093786490282",
  appId: "1:1093786490282:web:7c0aaad4c385f8508147d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app); // If using authentication

export { db, auth };
