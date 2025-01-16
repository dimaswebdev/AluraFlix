import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Carousel.css";

function Carousel() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      title:
        "Como aprender programação de forma INTELIGENTE, sem perder tempo com coisas INÚTEIS",
      description:
        "Dicas e estratégias para aprender programação de maneira eficiente, focando no que realmente importa.",
      image: "https://img.youtube.com/vi/OqiuC8bdxb4/maxresdefault.jpg",
      videoUrl: "OqiuC8bdxb4", // Apenas o ID do vídeo
    },
    {
      title: "Como CRIAR um Canal de REACT RÁPIDO? (Passo a Passo)",
      description: "Saiba como criar e monetizar um canal de react no YouTube.",
      image: "https://img.youtube.com/vi/no1yHN5YsdA/maxresdefault.jpg",
      videoUrl: "no1yHN5YsdA", // Apenas o ID do vídeo
    },
    {
      title:
        "Como Começar um Canal de React no YouTube em 2025? (Passo a Passo Revelado)",
      description: "Dicas para iniciar um canal de react no YouTube em 2025.",
      image: "https://img.youtube.com/vi/c-D7uV2CiFQ/maxresdefault.jpg",
      videoUrl: "c-D7uV2CiFQ", // Apenas o ID do vídeo
    },
  ];

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
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={2000}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div
              className="carousel-slide"
              style={{
                backgroundImage: `url(${video.image})`,
              }}
            >
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <button
                className="watch-button"
                onClick={() => handleWatchClick(video)}
              >
                Assistir
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoUrl}`} // Formato correto
              title={selectedVideo.title}
              width="100%"
              height="400px"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

export default Carousel;
