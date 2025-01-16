import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./VideoGallery.css";

function VideoGallery({ sectionTitle, videos, onDelete }) {
  const [playingVideos, setPlayingVideos] = useState(
    videos.map(() => false) // Inicializa todos os vídeos como "não reproduzindo"
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

  const handlePlayVideo = (index) => {
    setPlayingVideos(
      (prev) => prev.map((_, i) => i === index) // Define "true" apenas para o índice clicado
    );
  };

  const handleClickOutside = useCallback(() => {
    setPlayingVideos(videos.map(() => false)); // Reseta todos os vídeos para thumbnails
  }, [videos]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="video-gallery">
      <h2 className="section-title">{sectionTitle}</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {videos.map((video, index) => (
            <div key={video.id} className="video-slide">
              {!playingVideos[index] ? (
                <img
                  src={video.image}
                  alt={video.title}
                  onClick={() => handlePlayVideo(index)}
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
              <div className="video-details">
                <h3>{video.title}</h3>
                <button
                  className="delete-button"
                  onClick={() => onDelete(video.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

VideoGallery.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  videos: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VideoGallery;
