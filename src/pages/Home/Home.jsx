import React, { useState, useEffect, useCallback } from "react";
import { ref, onValue, set } from "firebase/database";
import { database, auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginModal from "../../components/LoginModal";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import SocialMedia from "../../components/SocialMedia";
import VideoGallery from "../../components/VideoGallery";
import "./Home.css";

function Home() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal inicial visível
  const [sections, setSections] = useState([]);
  const [user, setUser] = useState(null);

  // Observa mudanças no estado de login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsModalOpen(!currentUser); // Exibe o modal de login se não houver usuário autenticado
    });

    return () => unsubscribe();
  }, []);

  // Sincroniza com o Firebase ao carregar o componente
  useEffect(() => {
    if (user) {
      const sectionsRef = ref(database, "videoSections");
      onValue(sectionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const firebaseSections = Object.values(data);
          setSections(firebaseSections);
        }
      });
    }
  }, [user]);

  // Salva as seções no Firebase
  const saveSectionsToFirebase = useCallback((updatedSections) => {
    const sectionsRef = ref(database, "videoSections");
    const formattedData = updatedSections.reduce((acc, section) => {
      acc[section.id] = section;
      return acc;
    }, {});
    set(sectionsRef, formattedData);
  }, []);

  // Adiciona vídeo à seção (somente admin)
  const addVideo = useCallback(
    (video, sectionTitle) => {
      if (!user || user.email !== "admin@aluraflix.com") {
        alert("Apenas administradores podem adicionar vídeos.");
        return;
      }

      const formattedVideo = {
        id: video.id,
        title: video.title || "Sem título",
        description: video.description || "Sem descrição",
        videoUrl: `https://www.youtube.com/embed/${video.id}`,
        image: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      };

      const updatedSections = sections.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              videos: section.videos.some((v) => v.id === video.id)
                ? section.videos
                : [...section.videos, formattedVideo],
            }
          : section
      );

      setSections(updatedSections);
      saveSectionsToFirebase(updatedSections);
    },
    [sections, saveSectionsToFirebase, user]
  );

  // Exclui vídeo da seção (somente admin)
  const deleteVideo = useCallback(
    (videoId, sectionTitle) => {
      if (!user || user.email !== "admin@aluraflix.com") {
        alert("Apenas administradores podem excluir vídeos.");
        return;
      }

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
    },
    [sections, saveSectionsToFirebase, user]
  );

  // Vídeos recomendados para o Carousel
  const recommendedVideos =
    sections.find((section) => section.title === "Recomendado para Você")
      ?.videos || [];

  // Realiza logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsModalOpen(true);
    });
  };

  // Renderiza apenas o modal de login se não houver usuário
  if (isModalOpen) {
    return <LoginModal onClose={() => setIsModalOpen(false)} />;
  }

  // Página principal com conteúdo
  return (
    <div className="home">
      <div className="background-container">
        <div className="background-image"></div>
        <div className="background-gradient"></div>
      </div>

      <Header onAddVideo={() => setPopupOpen(true)} onLogout={handleLogout} />
      <Carousel videos={recommendedVideos} />

      <main>
        {sections.map((section) => (
          <VideoGallery
            key={section.id}
            sectionTitle={section.title}
            videos={section.videos}
            onDelete={(videoId) => deleteVideo(videoId, section.title)}
            user={user}
          />
        ))}
      </main>

      {user.email === "admin@aluraflix.com" && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          onAdd={(video, sectionTitle) => addVideo(video, sectionTitle)}
          sections={sections.map((section) => ({
            id: section.id,
            title: section.title,
          }))}
        />
      )}

      <SocialMedia />
      <div className="spacer"></div>
      <Footer />
    </div>
  );
}

export default Home;
