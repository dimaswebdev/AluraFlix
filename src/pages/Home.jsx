import React, { useState } from "react";
import Header from "../components/header";
import Carousel from "../components/Carousel";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);

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
        <div>
          <VideoCard
            title="Exemplo de Vídeo"
            thumbnail="https://via.placeholder.com/300"
          />
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
