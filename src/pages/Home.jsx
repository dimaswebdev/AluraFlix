import React, { useState } from "react";
import Header from "../components/header";
import Carousel from "../components/Carousel";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";
import Footer from "../components/Footer"; // Importa o footer
import SocialMedia from "../components/SocialMedia"; // Importe o componente

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const videos = [
    { id: 1, title: "Vídeo 1", thumbnail: "https://via.placeholder.com/300" },
    { id: 2, title: "Vídeo 2", thumbnail: "https://via.placeholder.com/300" },
    { id: 3, title: "Vídeo 3", thumbnail: "https://via.placeholder.com/300" },
    { id: 4, title: "Vídeo 4", thumbnail: "https://via.placeholder.com/300" },
    { id: 5, title: "Vídeo 5", thumbnail: "https://via.placeholder.com/300" },
    { id: 6, title: "Vídeo 6", thumbnail: "https://via.placeholder.com/300" },
  ];

  const addVideo = (video) => {
    console.log("Vídeo adicionado:", video);
    setPopupOpen(false);
  };

  return (
    <>
      <Header onAddVideo={() => setPopupOpen(true)} />
      <Carousel />
      <main>
        <h1>Galeria de Vídeos</h1>
        <div className="video-gallery">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          ))}
        </div>
      </main>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={addVideo}
      />
       <SocialMedia /> {/* Adicione o componente de redes sociais */}
       
      <Footer /> {/* Adiciona o footer */}
    </>
  );
}

export default Home;
