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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsModalOpen(!currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  const saveSectionsToFirebase = useCallback((updatedSections) => {
    const sectionsRef = ref(database, "videoSections");
    const formattedData = updatedSections.reduce((acc, section) => {
      acc[section.id] = section;
      return acc;
    }, {});
    set(sectionsRef, formattedData);
  }, []);

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

  const editVideo = useCallback(
    (updatedVideo, newSectionTitle) => {
      if (!user || user.email !== "admin@aluraflix.com") {
        alert("Apenas administradores podem editar vídeos.");
        return;
      }

      const updatedSections = sections.map((section) => {
        if (section.videos.some((video) => video.id === updatedVideo.id)) {
          return {
            ...section,
            videos: section.videos.filter((video) => video.id !== updatedVideo.id),
          };
        }
        if (section.title === newSectionTitle) {
          return {
            ...section,
            videos: [...section.videos, updatedVideo],
          };
        }
        return section;
      });

      setSections(updatedSections);
      saveSectionsToFirebase(updatedSections);
    },
    [sections, saveSectionsToFirebase, user]
  );

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

  const recommendedVideos =
    sections.find((section) => section.title === "Recomendado para Você")
      ?.videos || [];

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsModalOpen(true);
    });
  };

  const openEditPopup = (video) => {
    setEditingVideo(video);
    setPopupOpen(true);
  };

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
