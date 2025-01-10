import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Popup from "../../components/Popup";
import Footer from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import VideoGallery from "../../components/VideoGallery";

import "./Home.css";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [videos, setVideos] = useState(() => {
    // Recupera vídeos do localStorage
    const savedVideos = localStorage.getItem("videos");
    return savedVideos
      ? JSON.parse(savedVideos)
      : [
          {
            thumbnail: "https://via.placeholder.com/260x146",
            videoTitle: "Título do Vídeo 1",
            description: "Descrição do vídeo 1",
            details: "1 Temporada • HD • Ação",
          },
          {
            thumbnail: "https://via.placeholder.com/260x146",
            videoTitle: "Título do Vídeo 2",
            description: "Descrição do vídeo 2",
            details: "2 Temporadas • 4K • Drama",
          },
        ];
  });

  useEffect(() => {
    // Salva os vídeos no localStorage
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  const addVideo = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  // Dados para cada seção
  const videoSections = [
    {
      title: "Recomendado para Você",
      videos: [
        {
          title: "Video 1",
          thumbnail: "https://via.placeholder.com/300",
          match: "95%",
          age: "16",
          season: "1 Season",
          quality: "HD",
          genres: "Drama • Action",
        },
        {
          title: "Video 2",
          thumbnail: "https://via.placeholder.com/300",
          match: "90%",
          age: "12",
          season: "2 Seasons",
          quality: "4K",
          genres: "Comedy • Romance",
        },
      ],
    },
    {
      title: "Aprendendo React",
      videos: [
        {
          title: "Video 3",
          thumbnail: "https://via.placeholder.com/300",
          match: "89%",
          age: "18",
          season: "3 Seasons",
          quality: "HD",
          genres: "Horror • Thriller",
        },
        {
          title: "Video 4",
          thumbnail: "https://via.placeholder.com/300",
          match: "92%",
          age: "10",
          season: "4 Seasons",
          quality: "HD",
          genres: "Adventure • Animation",
        },
      ],
    },
    {
      title: "Aprenda JavaScript",
      videos: [
        {
          title: "Video 5",
          thumbnail: "https://via.placeholder.com/300",
          match: "87%",
          age: "16",
          season: "1 Season",
          quality: "HD",
          genres: "Science Fiction • Fantasy",
        },
        {
          title: "Video 6",
          thumbnail: "https://via.placeholder.com/300",
          match: "91%",
          age: "18",
          season: "2 Seasons",
          quality: "HD",
          genres: "Adventure • Comedy",
        },
      ],
    },
    {
      title: "Top Rated",
      videos: [
        {
          title: "Video 7",
          thumbnail: "https://via.placeholder.com/300",
          match: "93%",
          age: "12",
          season: "1 Season",
          quality: "4K",
          genres: "Drama • Biography",
        },
        {
          title: "Video 8",
          thumbnail: "https://via.placeholder.com/300",
          match: "88%",
          age: "14",
          season: "3 Seasons",
          quality: "HD",
          genres: "Romance • Mystery",
        },
      ],
    },
  ];

  return (
    <div className="home">
      {/* Fundo com gradiente */}
      <div className="background-container">
        <div className="background-image"></div>
        <div className="background-gradient"></div>
      </div>

      {/* Cabeçalho */}
      <Header onAddVideo={() => setPopupOpen(true)} />

      {/* Carrossel */}
      <Carousel />

      {/* Seções de vídeos usando VideoGallery */}
      <main>
        {videoSections.map((section, index) => (
          <VideoGallery
            key={index}
            videos={section.videos}
            sectionTitle={section.title}
          />
        ))}
      </main>

      {/* Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={addVideo}
      />

      {/* Redes Sociais */}
      <SocialMedia />

      {/* Espaço antes do rodapé */}
      <div className="spacer"></div>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default Home;
