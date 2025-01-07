import React, { useState, useRef } from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";

import "../styles/Home.css"; // Importa o estilo adicional

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const videoSections = [
    {
      id: 1,
      title: "Recomendados para Você",
      videos: Array(10).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 2,
      title: "Tendências",
      videos: Array(10).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 3,
      title: "Novidades",
      videos: Array(10).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 4,
      title: "Continue Assistindo",
      videos: Array(10).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
  ];

  const sectionRefs = useRef([]);

  const addVideo = (video) => {
    console.log("Vídeo adicionado:", video);
    setPopupOpen(false);
  };

  const scrollSection = (ref, direction) => {
    if (ref) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="home">
      {/* Fundo com imagem e gradiente */}
      <div className="background-container">
        <div className="background-image"></div>
        <div className="background-gradient"></div>
      </div>

      {/* Cabeçalho */}
      <Header onAddVideo={() => setPopupOpen(true)} />

      {/* Carrossel */}
      <Carousel />

      {/* Conteúdo principal */}
      <main>
        {videoSections.map((section, index) => (
          <section key={section.id} className="video-section">
            <h2 className="video-section-title">{section.title}</h2>
            <div className="video-section-controls">
              <button
                className="scroll-button left"
                onClick={() => scrollSection(sectionRefs.current[index], "left")}
              >
                &lt;
              </button>
              <div
                className="video-section-gallery"
                ref={(el) => (sectionRefs.current[index] = el)}
              >
                {section.videos.slice(0, 4).map((video, videoIndex) => (
                  <VideoCard key={videoIndex} title="" thumbnail={video.thumbnail} />
                ))}
              </div>
              <button
                className="scroll-button right"
                onClick={() => scrollSection(sectionRefs.current[index], "right")}
              >
                &gt;
              </button>
            </div>
          </section>
        ))}
      </main>

      {/* Popup para adicionar vídeo */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={addVideo}
      />

      {/* Redes sociais fixas */}
      <SocialMedia />

      <div className="spacer"></div> {/* Espaço antes do footer */}

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default Home;
