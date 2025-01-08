import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Carousel.css"; // Certifique-se de importar o CSS

function Carousel() {
  const videos = [
    {
      title: "SEO com React",
      description: "Aprenda a otimizar SEO usando React.",
      image: "/img/imagem - 01.png", // Imagem provisória
    },
    {
      title: "Performance com Next.js",
      description: "Melhore a performance com Next.js.",
      image: "https://via.placeholder.com/300x200", // Imagem provisória
    },
    {
      title: "Integração com APIs",
      description: "Tutorial de integração com APIs usando React.",
      image: "https://via.placeholder.com/300x200", // Imagem provisória
    },
  ];

  return (
    <section className="carousel">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-slide">
              <div className="carousel-text">
                <h2>{video.title}</h2>
                <p>{video.description}</p>
              </div>
              <div className="carousel-image">
                <img src={video.image} alt={video.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Carousel;
