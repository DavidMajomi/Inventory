// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuJcEvql0WIaTt7S8ZYiDafRiiYR3CWB8",
  authDomain: "inventory-management-c1a62.firebaseapp.com",
  projectId: "inventory-management-c1a62",
  storageBucket: "inventory-management-c1a62.appspot.com",
  messagingSenderId: "273986304326",
  appId: "1:273986304326:web:4a6c2e1a8e60adcbc70d47",
  measurementId: "G-66YMGHZKNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  firestore = getFirestore(app)
export {firestore} ;  //export firestore to use in other files