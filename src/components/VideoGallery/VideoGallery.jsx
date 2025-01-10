import React from "react";
import PropTypes from "prop-types"; // Importação do PropTypes
import Slider from "react-slick";
import "./VideoGallery.css";

function VideoGallery({ videos, sectionTitle }) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="video-gallery">
      <h2 className="section-title">{sectionTitle}</h2>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="video-slide">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.genres}</p>
              <p>
                {video.match} | {video.age} | {video.season} | {video.quality}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Adição da validação de PropTypes
VideoGallery.propTypes = {
  sectionTitle: PropTypes.string.isRequired, // Título da seção é obrigatório e deve ser uma string
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired, // URL da imagem é obrigatória
      title: PropTypes.string.isRequired, // Título é obrigatório
      genres: PropTypes.string, // Gêneros (opcional)
      match: PropTypes.string, // Porcentagem de compatibilidade (opcional)
      age: PropTypes.string, // Classificação etária (opcional)
      season: PropTypes.string, // Temporadas (opcional)
      quality: PropTypes.string, // Qualidade (opcional)
    }),
  ).isRequired, // Lista de vídeos é obrigatória
};

export default VideoGallery;
