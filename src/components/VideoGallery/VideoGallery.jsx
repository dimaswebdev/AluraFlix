import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./VideoGallery.css";

function CenterMode() {
  const [playingVideos, setPlayingVideos] = useState(
    Array(6).fill(false) // Inicializa todos os vídeos como "não reproduzindo"
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

  const sections = [
    {
      title: "Aprendendo React",
      videos: [
        { id: "dQw4w9WgXcQ", title: "React Basics" },
        { id: "3JZ_D3ELwOQ", title: "Understanding Hooks" },
        { id: "2Vv-BfVoq4g", title: "React Router Explained" },
        { id: "kJQP7kiw5Fk", title: "Component Lifecycle" },
        { id: "RgKAFK5djSk", title: "State Management" },
        { id: "CevxZvSJLk8", title: "React with TypeScript" },
      ],
    },
  ];

  const handlePlayVideo = (index) => {
    setPlayingVideos(
      (prevState) => prevState.map((_, i) => i === index) // Define "true" apenas para o índice clicado
    );
  };

  const handleClickOutside = () => {
    setPlayingVideos(Array(6).fill(false)); // Reseta todos os vídeos para thumbnails
  };

  useEffect(() => {
    // Adiciona o listener para cliques em qualquer área da tela
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove o listener ao desmontar o componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="video-gallery">
      {sections.map((section, index) => (
        <div key={index} className="slider-container">
          <h2 className="section-title">{section.title}</h2>
          <Slider {...settings}>
            {section.videos.map((video, videoIndex) => (
              <div key={video.id} className="video-slide">
                {!playingVideos[videoIndex] ? (
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    onClick={() => handlePlayVideo(videoIndex)}
                    className="video-thumbnail"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allowFullScreen
                  ></iframe>
                )}
                <h3>{video.title}</h3>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
}

export default CenterMode;
