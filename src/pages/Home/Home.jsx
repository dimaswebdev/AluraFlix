import React, { useState, useEffect, useCallback } from "react";
import { ref, onValue, set } from "firebase/database"; // Firebase
import { database } from "../../firebase"; // Configuração do Firebase
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Popup from "../../components/Popup";
import Footer from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import VideoGallery from "../../components/VideoGallery";
import "./Home.css";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [sections, setSections] = useState([
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
  ]);

  // Sincroniza com o Firebase ao carregar o componente
  useEffect(() => {
    const sectionsRef = ref(database, "videoSections"); // Referência no Firebase
    onValue(sectionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const firebaseSections = Object.values(data);
        // Atualiza o estado local apenas com as seções que existem no Firebase
        setSections((prevSections) =>
          prevSections.map((section) => {
            const matchingSection = firebaseSections.find(
              (s) => s.title === section.title
            );
            return matchingSection
              ? { ...matchingSection, videos: matchingSection.videos || [] } // Garante que "videos" é sempre um array
              : section; // Mantém a seção local se não estiver no Firebase
          })
        );
      }
    });
  }, []);

  // Salva as seções no Firebase
  const saveSectionsToFirebase = useCallback((updatedSections) => {
    const sectionsRef = ref(database, "videoSections");
    const formattedData = updatedSections.reduce((acc, section) => {
      acc[section.id] = section; // Converte o array para um objeto
      return acc;
    }, {});
    set(sectionsRef, formattedData);
  }, []);

  // Adiciona um vídeo à seção selecionada
  const addVideo = useCallback((video, sectionTitle) => {
    const formattedVideo = {
      id: video.id, // ID único do vídeo
      title: video.title || "Sem título", // Título do vídeo
      description: video.description || "Sem descrição", // Descrição do vídeo
      videoUrl: `https://www.youtube.com/embed/${video.id}`, // URL do player do vídeo
      image: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`, // Thumbnail do vídeo
    };

    const updatedSections = sections.map((section) =>
      section.title === sectionTitle
        ? {
            ...section,
            videos: section.videos.some((v) => v.id === video.id)
              ? section.videos // Não adiciona duplicatas
              : [...section.videos, formattedVideo], // Adiciona o vídeo formatado
          }
        : section
    );

    setSections(updatedSections); // Atualiza o estado local
    saveSectionsToFirebase(updatedSections); // Sincroniza com o Firebase
  }, [sections, saveSectionsToFirebase]);

  // Remove um vídeo de uma seção
  const deleteVideo = useCallback((videoId, sectionTitle) => {
    const updatedSections = sections.map((section) =>
      section.title === sectionTitle
        ? {
            ...section,
            videos: section.videos.filter((video) => video.id !== videoId),
          }
        : section
    );
    setSections(updatedSections);
    saveSectionsToFirebase(updatedSections);
  }, [sections, saveSectionsToFirebase]);

  // Obtém vídeos da seção "Recomendado para Você" para o Carousel
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