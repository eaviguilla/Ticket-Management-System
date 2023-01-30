import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_3enVs7DJ_x4D0GSV-pYl5Nym8oEmgw",
  authDomain: "ramaintenance-lm42.firebaseapp.com",
  projectId: "ramaintenance-lm42",
  storageBucket: "ramaintenance-lm42.appspot.com",
  messagingSenderId: "1041550414736",
  appId: "1:1041550414736:web:f7ff9620c311f60ab25915",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
