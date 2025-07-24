
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI62ZluzRR1eDb0v33HtUYKHIb5xDCczU",
  authDomain: "newdiamond-c7536.firebaseapp.com",
  projectId: "newdiamond-c7536",
  storageBucket: "newdiamond-c7536.firebasestorage.app",
  messagingSenderId: "523388075658",
  appId: "1:523388075658:web:cdd09b451e7bd41fc1f773"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);