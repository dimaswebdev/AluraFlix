import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function Popup({ isOpen, onClose, onAdd, onEdit, isEditing, videoData, sections }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [selectedSection, setSelectedSection] = useState(sections[0]?.title || "");

  // Preenche os campos no modo de edição ou limpa no modo de adição
  useEffect(() => {
    if (isEditing && videoData) {
      setUrl(`https://www.youtube.com/watch?v=${videoData.id}` || "");
      setTitle(videoData.title || "");
      setDescription(videoData.description || "");
      setDetails(videoData.details || "");
      setSelectedSection(videoData.section || sections[0]?.title || "");
    } else {
      setUrl("");
      setTitle("");
      setDescription("");
      setDetails("");
      setSelectedSection(sections[0]?.title || "");
    }
  }, [isEditing, videoData, sections]);

  const extractYouTubeId = (youtubeUrl) => {
    const regex =
      /(?:[?&]v=|\/embed\/|\.be\/|\/v\/|\/vi\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = isEditing ? videoData.id : extractYouTubeId(url);
    if (!videoId) {
      alert("URL do vídeo inválida. Por favor, insira uma URL válida do YouTube.");
      return;
    }

    const videoPayload = {
      id: videoId,
      videoUrl: `https://www.youtube.com/embed/${videoId}`,
      title: title.trim() || "Sem título",
      description: description.trim() || "Sem descrição",
      details: details.trim() || "Sem detalhes",
      section: selectedSection,
      image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };

    if (isEditing) {
      onEdit(videoPayload, selectedSection); // Envia os dados editados e a nova seção
    } else {
      onAdd(videoPayload, selectedSection); // Adiciona o vídeo à seção selecionada
    }

    onClose();
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
        <h2>{isEditing ? "Editar Vídeo" : "Adicionar Vídeo"}</h2>
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
            <button type="submit">{isEditing ? "Salvar Alterações" : "Adicionar"}</button>
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
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  videoData: PropTypes.shape({
    id: PropTypes.string,
    videoUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.string,
    section: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Popup.defaultProps = {
  onAdd: () => {},
  onEdit: () => {},
  isEditing: false,
  videoData: null,
};

export default Popup;
