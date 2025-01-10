import React from "react";
import Slider from "react-slick";
import "./VideoGallery.css"; // Importa os estilos

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  // Array de vídeos do YouTube
  const videos = [
    { id: "dQw4w9WgXcQ", title: "Video 1" },
    { id: "3JZ_D3ELwOQ", title: "Video 2" },
    { id: "2Vv-BfVoq4g", title: "Video 3" },
    { id: "kJQP7kiw5Fk", title: "Video 4" },
    { id: "RgKAFK5djSk", title: "Video 5" },
    { id: "CevxZvSJLk8", title: "Video 6" },
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} className="video-slide">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allowFullScreen
            ></iframe>
            <h3>{video.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CenterMode;
