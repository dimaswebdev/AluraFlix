import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./VideoGallery.css";

const VideoSlide = ({ video, isPlaying, onPlay, onDelete, onEdit, showDelete, showEdit }) => (
  <div className="video-slide">
    {!isPlaying ? (
      <img
        src={video.image}
        alt={video.title}
        onClick={onPlay}
        className="video-thumbnail"
      />
    ) : (
      <iframe
        src={video.videoUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="video-iframe"
      ></iframe>
    )}

    {/* Conteúdo do vídeo: título e descrição */}
    <div className="content">
      <h3 className="video-title">{video.title}</h3>
      <p className="video-description">
        {video.description.length > 100
          ? `${video.description.substring(0, 100)}...`
          : video.description}
      </p>
    </div>

    {/* Botões de ação */}
    <div className="actions">
      {showEdit && (
        <button
          className="edit-button"
          onClick={() => onEdit(video)}
          aria-label={`Editar ${video.title}`}
        >
          Editar
        </button>
      )}
      {showDelete && (
        <button
          className="delete-button"
          onClick={() => onDelete(video.id)}
          aria-label={`Excluir ${video.title}`}
        >
          Excluir
        </button>
      )}
    </div>
  </div>
);

VideoSlide.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  showEdit: PropTypes.bool.isRequired,
};

function VideoGallery({ sectionTitle, videos, onDelete, onEdit, user }) {
  const [playingVideos, setPlayingVideos] = useState(
    videos.map(() => false)
  );

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "50px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
        },
      },
    ],
  };

  const handlePlayVideo = useCallback((index) => {
    setPlayingVideos((prev) => prev.map((_, i) => i === index));
  }, []);

  const handleClickOutside = useCallback(() => {
    setPlayingVideos(videos.map(() => false));
  }, [videos]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const isAdmin = user?.email === "admin@aluraflix.com";

  return (
    <div className="video-gallery">
      <h2 className="section-title">{sectionTitle}</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {videos.map((video, index) => (
            <VideoSlide
              key={video.id}
              video={video}
              isPlaying={playingVideos[index]}
              onPlay={() => handlePlayVideo(index)}
              onDelete={onDelete}
              onEdit={onEdit}
              showDelete={isAdmin}
              showEdit={isAdmin}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

VideoGallery.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      videoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
};

VideoGallery.defaultProps = {
  user: null,
};

export default VideoGallery;
