// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClZwyD5v5r-JfDuIGGmtxDBJeK6ur3uss",
  authDomain: "zayko-5be72.firebaseapp.com",
  projectId: "zayko-5be72",
  storageBucket: "zayko-5be72.firebasestorage.app",
  messagingSenderId: "985928697859",
  appId: "1:985928697859:web:2364acc498a9fda18c2636",
  measurementId: "G-NPCSTNMY8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
