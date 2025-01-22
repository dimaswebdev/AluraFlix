import React, { useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "./Carousel.css";

const videos = [
  {
    title: "Como Começar um Canal de React no YouTube em 2025? (Passo a Passo Revelado)",
    description: "Dicas para iniciar um canal de react no YouTube em 2025.",
    image: "https://img.youtube.com/vi/c-D7uV2CiFQ/maxresdefault.jpg",
    videoUrl: "c-D7uV2CiFQ",
  },
  {
    title: "Como aprender programação de forma INTELIGENTE, sem perder tempo com coisas INÚTEIS",
    description: "Dicas e estratégias para aprender programação de maneira eficiente, focando no que realmente importa.",
    image: "https://img.youtube.com/vi/OqiuC8bdxb4/maxresdefault.jpg",
    videoUrl: "OqiuC8bdxb4",
  },
  {
    title: "Curso completo de HTML - seu PRIMEIRO SITE DO ZERO para iniciar em PROGRAMAÇÃO!",
    description: "Saiba como criar e monetizar um canal de react no YouTube.",
    image: "https://img.youtube.com/vi/Fhy-5CtVkiM/maxresdefault.jpg",
    videoUrl: "Fhy-5CtVkiM",
  },
];

const VideoSlide = React.memo(({ video, onWatchClick }) => (
  <div
    className="carousel-slide"
    style={{ backgroundImage: `url(${video.image})` }}
  >
    <div className="carousel-content">
      <h2 className="carousel-title">{video.title}</h2>
      <p className="carousel-description">{video.description}</p>
      <button
        className="watch-button"
        onClick={() => onWatchClick(video)}
        aria-label={`Assistir ao vídeo: ${video.title}`}
      >
        Assistir
      </button>
    </div>
  </div>
));

VideoSlide.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  onWatchClick: PropTypes.func.isRequired,
};

const Modal = ({ video, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${video.videoUrl}`}
        title={video.title}
        width="100%"
        height="400px"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

Modal.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

function Carousel() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleWatchClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="carousel">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
        loop={true}
        pagination={{ clickable: true }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <VideoSlide video={video} onWatchClick={handleWatchClick} />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedVideo && <Modal video={selectedVideo} onClose={closeModal} />}
    </section>
  );
}

export default Carousel;