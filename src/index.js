// ===== Importações =====
// Estilos do React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Bibliotecas externas
import React from "react";
import ReactDOM from "react-dom/client";

// Arquivos internos
import "./index.css"; // Estilos globais
import App from "./App";

// ===== Inicialização do React =====
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ===== Medições de Performance =====
// Para habilitar medições, descomente o código abaixo
// import reportWebVitals from "./reportWebVitals";
// reportWebVitals(console.log);
