import React, { useState } from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";

import "../styles/Home.css"; // Importa o estilo adicional

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Lista de vídeos (com placeholders)
  const videoSections = [
    {
      id: 1,
      title: "Recomendados para Você",
      videos: Array(6).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 2,
      title: "Tendências",
      videos: Array(6).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 3,
      title: "Novidades",
      videos: Array(6).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
    {
      id: 4,
      title: "Continue Assistindo",
      videos: Array(6).fill({ thumbnail: "https://via.placeholder.com/260x146" }),
    },
  ];

  const addVideo = (video) => {
    console.log("Vídeo adicionado:", video);
    setPopupOpen(false);
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

      {/* Carrossel de vídeos */}
      <Carousel />

      {/* Conteúdo principal */}
      <main>
        {videoSections.map((section) => (
          <section key={section.id} className="video-section">
            <h2 className="video-section-title">{section.title}</h2>
            <div className="video-section-gallery">
              {section.videos.map((video, index) => (
                <VideoCard
                  key={index}
                  title=""
                  thumbnail={video.thumbnail}
                />
              ))}
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

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default Home;
