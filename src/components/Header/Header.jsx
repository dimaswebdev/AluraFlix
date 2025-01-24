import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { auth, onAuthStateChanged } from "../../firebase";
import { signOut } from "firebase/auth";
import LoginModal from "../LoginModal";

function Header({ onAddVideo }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setSearchOpen(true);
      searchInputRef.current.focus();
    } else if (!isValidSearch(searchQuery)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }
  };

  const handleSearchBlur = (e) => {
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert("Logout realizado com sucesso!"))
      .catch((error) => alert("Erro ao sair: " + error.message));
  };

  const isAdmin = user?.email === "admin@aluraflix.com";

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo-container">
          <img src="/dimas-logo.png" alt="Logo" className="logo" />
          <span className="site-title">Aluraflix</span>
        </div>

        <div className="icons-container">
          <div
            className={`search-container ${isSearchOpen ? "search-open" : ""}`}
            onBlur={handleSearchBlur}
            tabIndex="-1"
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

          {isAdmin && (
            <div className="icon-item" onClick={onAddVideo}>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>Adicionar Vídeo</span>
            </div>
          )}

          {user ? (
            <>
              <div className="icon-item user-email">
                <span>{user.email}</span>
              </div>
              <div className="icon-item" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </div>
            </>
          ) : (
            <div className="icon-item" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Login</span>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
}

Header.propTypes = {
  onAddVideo: PropTypes.func.isRequired,
};

export default Header;
