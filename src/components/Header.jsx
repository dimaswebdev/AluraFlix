import React from "react";
import "../styles/Header.css";


function Header() {
  return (
    <header className="header">
      <h1 className="logo">Aluraflix</h1>
      <nav>
        <ul className="nav-links">
          <li>Home</li>
          <li>Favoritos</li>
          <li>Adicionar Vídeo</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
