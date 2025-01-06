import React from "react";
import Header from "../components/header";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";

function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Galeria de Vídeos</h1>
        <div>
          <VideoCard title="Exemplo de Vídeo" thumbnail="https://via.placeholder.com/300" />
        </div>
      </main>
      <Popup isOpen={false} onClose={() => {}} onAdd={() => {}} />
    </>
  );
}

export default Home;
