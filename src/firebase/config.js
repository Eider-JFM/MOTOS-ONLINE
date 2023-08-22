
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8_kAZTLFQ4Kmgoj6Rac8Woj15evDilW0",
  authDomain: "tienda-dgt.firebaseapp.com",
  projectId: "tienda-dgt",
  storageBucket: "tienda-dgt.appspot.com",
  messagingSenderId: "133248975853",
  appId: "1:133248975853:web:2aa19298f814b251555de4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);