import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function Popup({ isOpen, onClose, onAdd, sections }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [selectedSection, setSelectedSection] = useState(
    sections[0]?.title || ""
  );

  const extractYouTubeId = (youtubeUrl) => {
    const regex =
      /(?:[?&]v=|\/embed\/|\.be\/|\/v\/|\/vi\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractYouTubeId(url);
    if (videoId && title && description && details && selectedSection) {
      onAdd(
        {
          id: videoId,
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          title,
          description,
          details,
        },
        selectedSection // Envia o título da seção para `onAdd`
      );
      setUrl("");
      setTitle("");
      setDescription("");
      setDetails("");
      setSelectedSection(sections[0]?.title || "");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Adicionar Vídeo</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            {sections.map((section) => (
              <option key={section.id} value={section.title}>
                {section.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="URL do vídeo do YouTube"
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
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Popup;
