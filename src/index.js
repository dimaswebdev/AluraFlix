// ===== Importação de estilos externos =====
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ===== Importação de bibliotecas externas =====
import React from "react";
import ReactDOM from "react-dom/client";

// ===== Importação de arquivos internos =====
import "./index.css"; // Estilos globais
import App from "./App";

// ===== Inicialização do React =====
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ===== Medições de performance (opcional) =====
// import reportWebVitals from "./reportWebVitals";
// reportWebVitals(console.log);
