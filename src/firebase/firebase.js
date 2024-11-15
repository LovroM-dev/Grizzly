// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { } from 'firebase/database'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBomlhDwemlZSJFjPPfmWpCPcMjNcoxDmg",
  authDomain: "grizzly-workout-tracker.firebaseapp.com",
  projectId: "grizzly-workout-tracker",
  storageBucket: "grizzly-workout-tracker.firebasestorage.app",
  messagingSenderId: "401365896974",
  appId: "1:401365896974:web:d8ce6acc0936a76853915f",
  measurementId: "G-BVZMVXLHW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()