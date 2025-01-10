import React, { useState } from "react";
import PropTypes from "prop-types"; // Importação de PropTypes
import "./Popup.css";

function Popup({ isOpen, onClose, onAdd }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página
    if (url && title && description && details) {
      onAdd({ url, title, description, details });
      setUrl(""); // Limpa os campos após adicionar
      setTitle("");
      setDescription("");
      setDetails("");
    }
  };

  if (!isOpen) {
    return null; // Retorna nada se o popup não estiver aberto
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Adicionar Vídeo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="URL da thumbnail do vídeo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Título do vídeo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição do vídeo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Detalhes do vídeo (ex: 1 Temporada • HD)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="popup-buttons">
            <button type="submit">Adicionar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Popup;
