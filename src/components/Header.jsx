import React from "react";
import "../styles/Header.css";

function Header({ onAddVideo }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/dimas-logo.png" alt="Logo Aluraflix" className="logo-image" />
        <h1 className="logo-text">Aluraflix</h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar vídeos..." />
      </div>
      <button className="add-video-button" onClick={onAddVideo}>
        Adicionar Vídeo
      </button>
    </header>
  );
}

export default Header;
