import React, { useState, useRef } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

function Header({ onAddVideo }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setSearchOpen(true);
      searchInputRef.current.focus();
    } else if (!isValidSearch(searchQuery)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      console.log("Busca válida:", searchQuery);
    }
  };

  const handleSearchBlur = (e) => {
    // Verifica se o clique foi fora do campo de pesquisa
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchOpen(false);
      setSearchQuery("");
      setShowTooltip(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowTooltip(false);
  };

  const isValidSearch = (query) => {
    const validTitles = ["Aluraflix", "React", "Vídeos"];
    return validTitles.some((title) =>
      title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <img src="/dimas-logo.png" alt="Logo" className="logo" />
          <span className="site-title">Aluraflix</span>
        </div>

        <div className="icons-container">
          {/* Barra de Pesquisa */}
          <div
            className={`search-container ${isSearchOpen ? "search-open" : ""}`}
            onBlur={handleSearchBlur} // Detecta clique fora
            tabIndex="-1" // Necessário para o evento Blur funcionar corretamente
          >
            <input
              type="text"
              ref={searchInputRef}
              className="search-input"
              placeholder="Buscar vídeos..."
              value={searchQuery}
              onChange={handleInputChange}
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

Header.propTypes = {
  onAddVideo: PropTypes.func.isRequired,
};

export default Header;
