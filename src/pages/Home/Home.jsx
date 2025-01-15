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

  // Inicializa o estado de sections a partir do localStorage
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem("videoSections");
    return savedSections
      ? JSON.parse(savedSections)
      : [
          {
            id: 1,
            title: "Recomendado para Você",
            videos: [
              {
                id: "d73vYX8gsuQ",
                title: "Título do Vídeo 1",
                description: "Descrição do Vídeo 1",
                videoUrl: "https://www.youtube.com/embed/d73vYX8gsuQ",
                image: "https://img.youtube.com/vi/d73vYX8gsuQ/hqdefault.jpg",
              },
              {
                id: "BHuAzUu19VQ",
                title: "Título do Vídeo 2",
                description: "Descrição do Vídeo 2",
                videoUrl: "https://www.youtube.com/embed/BHuAzUu19VQ",
                image: "https://img.youtube.com/vi/BHuAzUu19VQ/hqdefault.jpg",
              },
            ],
          },
          {
            id: 2,
            title: "Aprendendo",
            videos: [],
          },
          {
            id: 3,
            title: "Aprenda JavaScript",
            videos: [],
          },
          {
            id: 4,
            title: "Mais Vistos",
            videos: [],
          },
        ];
  });

  // Sincroniza o estado de sections com o localStorage
  useEffect(() => {
    localStorage.setItem("videoSections", JSON.stringify(sections));
  }, [sections]);

  // Adiciona um vídeo à seção selecionada
  const addVideo = (video, sectionTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              videos: section.videos.some((v) => v.id === video.id)
                ? section.videos // Não adiciona duplicatas
                : [...section.videos, video],
            }
          : section
      )
    );
  };

  // Remove um vídeo de uma seção
  const deleteVideo = (videoId, sectionTitle) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              videos: section.videos.filter((video) => video.id !== videoId),
            }
          : section
      )
    );
  };

  // Obtém vídeos da primeira seção para o Carousel
  const recommendedVideos =
    sections.find((section) => section.title === "Recomendado para Você")
      ?.videos || [];

  return (
    <div className="home">
      <div className="background-container">
        <div className="background-image"></div>
        <div className="background-gradient"></div>
      </div>

      <Header onAddVideo={() => setPopupOpen(true)} />
      <Carousel videos={recommendedVideos} />

      <main>
        {sections.map((section) => (
          <VideoGallery
            key={section.id}
            sectionTitle={section.title}
            videos={section.videos}
            onDelete={(videoId) => deleteVideo(videoId, section.title)}
          />
        ))}
      </main>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onAdd={(video, sectionTitle) => addVideo(video, sectionTitle)}
        sections={sections.map((section) => ({
          id: section.id,
          title: section.title,
        }))}
      />

      <SocialMedia />
      <div className="spacer"></div>
      <Footer />
    </div>
  );
}

export default Home;
