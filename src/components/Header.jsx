import React, { useState, useRef } from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Header({ onAddVideo }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Controla o texto digitado
  const [showTooltip, setShowTooltip] = useState(false); // Controla a exibição do tooltip
  const searchInputRef = useRef(null); // Ref para o campo de entrada

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      // Se não há texto digitado, não faz nada
      setSearchOpen(true); // Expande a busca
      searchInputRef.current.focus(); // Coloca o foco no campo de texto
    } else if (!isValidSearch(searchQuery)) {
      // Verifica se o texto não corresponde
      setShowTooltip(true); // Exibe o tooltip
      setTimeout(() => setShowTooltip(false), 3000); // Esconde o tooltip após 3 segundos
    } else {
      console.log("Realizando busca:", searchQuery); // Realiza a busca (substituir pela lógica real)
    }
  };

  const handleSearchBlur = (e) => {
    // Retorna a barra de pesquisa ao estado inicial ao clicar fora
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchOpen(false);
      setSearchQuery(""); // Limpa o texto digitado
      setShowTooltip(false); // Esconde o tooltip (se estiver visível)
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); // Atualiza o texto digitado
    setShowTooltip(false); // Esconde o tooltip ao digitar
  };

  const isValidSearch = (query) => {
    // Define a validação (ajuste conforme sua lógica)
    const validTitles = ["Aluraflix", "React", "Vídeos"]; // Exemplos de títulos válidos
    return validTitles.some((title) =>
      title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <header>
      <div className="header-content">
        {/* Logo e Título */}
        <div className="logo-container">
          <img src="/dimas-logo.png" alt="Logo" className="logo" />
          <span className="site-title">Aluraflix</span>
        </div>

        {/* Ícones e Barra de Pesquisa */}
        <div className="icons-container">
          {/* Barra de Pesquisa */}
          <div
            className={`search-container ${isSearchOpen ? "search-open" : ""}`}
            onBlur={handleSearchBlur} // Fecha ao clicar fora
            tabIndex="-1" // Permite que o evento Blur funcione corretamente
          >
            <input
              type="text"
              ref={searchInputRef}
              className="search-input"
              placeholder="Buscar vídeos..."
              value={searchQuery}
              onChange={handleInputChange} // Atualiza o texto
            />
            <button className="search-btn" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {showTooltip && (
              <div className="tooltip">
                A busca não corresponde a nenhum título.
              </div>
            )}
          </div>

          {/* Botão Home */}
          <div className="icon-item">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </div>

          {/* Botão Adicionar Vídeo */}
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
