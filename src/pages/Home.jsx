import React, { useState } from "react";
import Header from "../components/header";
import Carousel from "../components/Carousel";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Lista de vídeos para a galeria
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
      <Carousel /> {/* Carrossel aparece abaixo do Header */}
      <main>
        <h1>Galeria de Vídeos</h1>
        <div className="video-gallery">
          {/* Renderiza cada vídeo */}
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
    </>
  );
}

export default Home;
