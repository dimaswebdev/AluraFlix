import React, { useState } from "react";
import "../styles/Popup.css";


function Popup({ isOpen, onClose, onAdd }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    onAdd({ url, title });
    setUrl("");
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Adicionar Vídeo</h2>
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
          <button onClick={handleSubmit}>Adicionar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
