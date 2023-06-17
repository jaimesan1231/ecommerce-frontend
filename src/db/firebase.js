// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8YLgKJIcvMo3raYPSCjOhQXB2lMdzyqs",
  authDomain: "ecommerce-1d66e.firebaseapp.com",
  databaseURL: "https://ecommerce-1d66e.firebaseio.com",
  projectId: "ecommerce-1d66e",
  storageBucket: "ecommerce-1d66e.appspot.com",
  messagingSenderId: "234871573536",
  appId: "1:234871573536:web:96f03ab4c4e545d916c045",
  measurementId: "G-CNQSWGQKMC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const checkAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(true);
    } else {
      callback(false);
    }
  });
};
export const auth = getAuth(app);
export const productsCollection = collection(db, "products");
export const categoriesCollection = collection(db, "categories");
export const usersCollection = collection(db, "users");
