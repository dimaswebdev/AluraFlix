
import React, { createContext, useState, useContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([
    {
      id: "SEO_with_React",
      url: "https://www.youtube.com/watch?v=SEO_with_React",
      title: "SEO com React",
      description: "Aprenda a otimizar SEO usando React.",
      image: "/img/imagem-01.png"
    },
    {
      id: "Performance_with_Nextjs",
      url: "https://www.youtube.com/watch?v=Performance_with_Nextjs",
      title: "Performance com Next.js",
      description: "Melhore a performance com Next.js.",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: "API_Integration_with_React",
      url: "https://www.youtube.com/watch?v=API_Integration_with_React",
      title: "Integração com APIs",
      description: "Tutorial de integração com APIs usando React.",
      image: "https://via.placeholder.com/300x200"
    }
  ]);

  const addVideo = (newVideo) => setVideos((prev) => [...prev, newVideo]);
  const deleteVideo = (id) => setVideos((prev) => prev.filter((video) => video.id !== id));

  return (
    <VideoContext.Provider value={{ videos, addVideo, deleteVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => useContext(VideoContext);
