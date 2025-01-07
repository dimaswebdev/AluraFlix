import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPlus,
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/VideoCard.css";

function VideoCard({ title, thumbnail, match, age, season, quality, genres }) {
  return (
    <div className="video-card">
      {/* Imagem do vídeo */}
      <img src={thumbnail} alt={title} className="video-thumbnail" />

      {/* Expansão no hover */}
      <div className="video-card-expanded">
        <div className="expanded-content">
          {/* Botões interativos */}
          <div className="icons">
            <button className="icon-btn">
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="icon-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="icon-btn">
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className="icon-btn">
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <button className="icon-btn">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>

          {/* Detalhes do vídeo */}
          <div className="details">
            <p className="match">{match || "89% Match"}</p>
            <span className="age">{age || "16"}</span>
            <span className="season">{season || "1 Season"}</span>
            <span className="quality">{quality || "HD"}</span>
          </div>

          {/* Gêneros */}
          <div className="genres">{genres || "Mystery • Thriller • Science Fiction"}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
