import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Popup from "./components/Popup";

// Lazy loading das páginas
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  // Estado para gerenciar os vídeos
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Aprenda JavaScript",
      description: "Curso de introdução ao JavaScript.",
      details: "1 Temporada • HD",
      image: "https://img.youtube.com/vi/xyz/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/xyz",
    },
    {
      id: "2",
      title: "React Básico",
      description: "Curso introdutório ao React.js.",
      details: "1 Temporada • Full HD",
      image: "https://img.youtube.com/vi/abc/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/abc",
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  // Funções para adicionar, editar e excluir vídeos
  const handleAddVideo = (newVideo) => {
    setVideos([...videos, { ...newVideo, id: Date.now().toString() }]);
    setIsPopupOpen(false);
  };

  const handleEditVideo = (updatedVideo) => {
    setVideos(videos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)));
    setIsPopupOpen(false);
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  const openEditPopup = (video) => {
    setEditingVideo(video);
    setIsPopupOpen(true);
  };

  const openAddPopup = () => {
    setEditingVideo(null);
    setIsPopupOpen(true);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Página inicial */}
          <Route
            path="/"
            element={
              <Home
                videos={videos} // Passa os vídeos para o Home
                onAddVideo={openAddPopup} // Passa a função para abrir o modal de adição
                onEditVideo={openEditPopup} // Passa a função para abrir o modal de edição
                onDeleteVideo={handleDeleteVideo} // Passa a função para deletar vídeos
              />
            }
          />
          {/* Página sobre */}
          <Route path="/about" element={<About />} />
          {/* Página de contato */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* Popup global */}
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onAdd={handleAddVideo}
          onEdit={handleEditVideo}
          isEditing={!!editingVideo}
          videoData={editingVideo}
          sections={[{ id: 1, title: "Geral" }]} // Seções para categorizar vídeos
        />
      </Suspense>
    </Router>
  );
}

export default App;
