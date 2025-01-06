import React, { useState } from "react";
import "../styles/Popup.css";

function Popup({ isOpen, onClose, onAdd }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página
    if (url && title) {
      onAdd({ url, title });
      setUrl(""); // Limpa os campos após adicionar
      setTitle("");
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
            placeholder="URL do vídeo"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Título do vídeo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

export default Popup;
