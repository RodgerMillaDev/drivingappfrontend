import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_j6-cOhnt_FwKdnFzNZmo68WAL7qKsp4",
  authDomain: "driving-web-app3.firebaseapp.com",
  projectId: "driving-web-app3",
  storageBucket: "driving-web-app3.firebasestorage.app",
  messagingSenderId: "803956858882",
  appId: "1:803956858882:web:8e925ec6344020eaf0071b",
  measurementId: "G-4N4XBJ5VGR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {db, auth}

