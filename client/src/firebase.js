import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC91mW_3UtgYZkBJ5efmGXCgRVZUECaSOg",
  authDomain: "mie-chat-app.firebaseapp.com",
  projectId: "mie-chat-app",
  storageBucket: "mie-chat-app.appspot.com",
  messagingSenderId: "834481114856",
  appId: "1:834481114856:web:14018af3c311d266a6035d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
