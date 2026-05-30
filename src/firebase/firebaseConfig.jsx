import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7kE6Tm7BZPGFRhsLsjZIj7PjmC9TLFtw",
  authDomain: "ndda-app.firebaseapp.com",
  projectId: "ndda-app",
  storageBucket: "ndda-app.firebasestorage.app",
  messagingSenderId: "752611757315",
  appId: "1:752611757315:web:b821118841275f1f6dad36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export {db, auth}

