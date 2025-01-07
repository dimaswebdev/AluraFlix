import React from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Header({ onAddVideo }) {
  return (
    <header>
      <div className="header-content">
        {/* Logo e Título */}
        <div className="logo-container">
          <img src="/dimas-logo.png" alt="Logo" className="logo" />
          <span className="site-title">Aluraflix</span>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Buscar vídeos..." />
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Ícones do Cabeçalho */}
        <div className="icons-container">
          <div className="icon-item">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </div>
          <div className="icon-item" onClick={onAddVideo}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Adicionar Vídeo</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
