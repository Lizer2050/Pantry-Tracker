// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDUAr-Q1y6yXHTSvr3KAtj4v3WUrAqnrI",
  authDomain: "inventory-management-44b9a.firebaseapp.com",
  projectId: "inventory-management-44b9a",
  storageBucket: "inventory-management-44b9a.appspot.com",
  messagingSenderId: "72833874859",
  appId: "1:72833874859:web:9049a00f6b6f654febb0ee",
  measurementId: "G-6867HK52LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
const db = getFirestore(app);

export {firestore, db}
