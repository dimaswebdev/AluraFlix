import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwOaEvhOc5oaf9tNOFCs4CcZz8aHXF4h8", // Chave de API fornecida
  authDomain: "aluraflix-92b4f.firebaseapp.com",
  databaseURL: "https://aluraflix-92b4f-default-rtdb.firebaseio.com",
  projectId: "aluraflix-92b4f",
  storageBucket: "aluraflix-92b4f.appspot.com",
  messagingSenderId: "250268019453",
  appId: "1:250268019453:web:395f99a79a87b63b892c94",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Realtime Database
const database = getDatabase(app);

// Inicializa o Firebase Authentication
const auth = getAuth(app);

// Exporta serviços e métodos úteis
export { database, auth, onAuthStateChanged, signOut, signInWithEmailAndPassword };
