
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Updated Firebase Config (Singapore Database URL ke saath):
const firebaseConfig = {
  apiKey: "AIzaSyClZwyD5v5r-JfDuIGGmtxD...", // Apni complete apiKey rakhein
  authDomain: "zayko-5be72.firebaseapp.com",
  databaseURL: "https://zayko-5be72-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zayko-5be72",
  storageBucket: "zayko-5be72.firebasestorage.app",
  messagingSenderId: "985928697859",
  appId: "1:985928697859:web:2364acc498...", // Apni complete appId rakhein
  measurementId: "G-NPCSTNMY8E"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, push, set, onValue, update, auth, signInWithEmailAndPassword };
