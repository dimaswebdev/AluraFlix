import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AZzaSyCwOaEvhOo5oaf9tN0FCs4CcZz8aHXF4h8",
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

export { database };
