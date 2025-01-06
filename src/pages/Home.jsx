import React, { useState } from "react"; // Importa o useState
import Header from "../components/header";
import VideoCard from "../components/VideoCard";
import Popup from "../components/Popup";

function Home() {
  // Estado para controlar se o popup está aberto ou fechado
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Função para adicionar um vídeo (implementação futura)
  const addVideo = (video) => {
    console.log("Vídeo adicionado:", video); // Apenas para teste
    setPopupOpen(false); // Fecha o popup após adicionar
  };

  return (
    <>
      {/* Passa a função onAddVideo para o Header */}
      <Header onAddVideo={() => setPopupOpen(true)} />
      <main>
        <h1>Galeria de Vídeos</h1>
        <div>
          <VideoCard
            title="Exemplo de Vídeo"
            thumbnail="https://via.placeholder.com/300"
          />
        </div>
      </main>
      {/* Popup renderizado com base no estado */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)} // Fecha o popup
        onAdd={addVideo} // Adiciona um vídeo
      />
    </>
  );
}

export default Home;
