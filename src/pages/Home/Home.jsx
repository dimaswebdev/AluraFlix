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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [sections, setSections] = useState([]);
  const [user, setUser] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // 🔹 Monitora autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsModalOpen(!currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Sincroniza os vídeos com o Firebase
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

  // 🔹 Salva os dados no Firebase
  const saveSectionsToFirebase = useCallback((updatedSections) => {
    const sectionsRef = ref(database, "videoSections");
    const formattedData = updatedSections.reduce((acc, section) => {
      acc[section.id] = section;
      return acc;
    }, {});
    set(sectionsRef, formattedData);
  }, []);

  // 🔹 Adiciona um novo vídeo a uma seção
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

  // 🔹 Edita um vídeo sem removê-lo da lista
  const editVideo = useCallback(
    (updatedVideo, newSectionTitle) => {
      if (!user || user.email !== "admin@aluraflix.com") {
        alert("Apenas administradores podem editar vídeos.");
        return;
      }

      let videoMoved = false;
      const updatedSections = sections.map((section) => {
        if (section.videos.some((video) => video.id === updatedVideo.id)) {
          if (section.title !== newSectionTitle) {
            // Remove o vídeo da seção original
            videoMoved = true;
            return {
              ...section,
              videos: section.videos.filter((video) => video.id !== updatedVideo.id),
            };
          } else {
            // Apenas atualiza os dados do vídeo
            return {
              ...section,
              videos: section.videos.map((video) =>
                video.id === updatedVideo.id ? { ...video, ...updatedVideo } : video
              ),
            };
          }
        }
        return section;
      });

      // Se o vídeo mudou de seção, adicionamos na nova
      if (videoMoved) {
        updatedSections.forEach((section) => {
          if (section.title === newSectionTitle) {
            section.videos.push(updatedVideo);
          }
        });
      }

      setSections(updatedSections);
      saveSectionsToFirebase(updatedSections);
    },
    [sections, saveSectionsToFirebase, user]
  );

  // 🔹 Exclui um vídeo
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

  // 🔹 Vídeos recomendados para o Carousel
  const recommendedVideos =
    sections.find((section) => section.title === "Recomendado para Você")
      ?.videos || [];

  // 🔹 Faz logout do usuário
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsModalOpen(true);
    });
  };

  // 🔹 Abre o modal de edição
  const openEditPopup = (video) => {
    setEditingVideo(video);
    setPopupOpen(true);
  };

  // 🔹 Se o usuário não estiver autenticado, exibe o modal de login
  if (isModalOpen) {
    return <LoginModal onClose={() => setIsModalOpen(false)} />;
  }

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
            onEdit={(video) => openEditPopup(video)}
            user={user}
          />
        ))}
      </main>
      {user?.email === "admin@aluraflix.com" && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => {
            setEditingVideo(null);
            setPopupOpen(false);
          }}
          onAdd={(video, sectionTitle) => addVideo(video, sectionTitle)}
          onEdit={(updatedVideo, sectionTitle) =>
            editVideo(updatedVideo, sectionTitle)
          }
          isEditing={!!editingVideo}
          videoData={editingVideo}
          sections={sections.map((section) => ({
            id: section.id,
            title: section.title,
          }))}
        />
      )}
      <SocialMedia />
      <Footer />
    </div>
  );
}

export default Home;
