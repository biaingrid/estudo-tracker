// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA50Avf-V7WGV0oNzwyv2lw0n41RLhmnG8",
  authDomain: "estudo-tracker.firebaseapp.com",
  projectId: "estudo-tracker",
  storageBucket: "estudo-tracker.appspot.com",
  messagingSenderId: "305539904185",
  appId: "1:305539904185:web:ebe424db35104ea817a168",
  measurementId: "G-TT48SZ7GGJ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta a instância do Firestore
const db = getFirestore(app);

export { db };
