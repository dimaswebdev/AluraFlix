
import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState([
        {
            id: 1,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            title: 'Video 1',
            description: 'This is a sample video description.',
            image: '/public/img/videos/imagem - 01.jpg'
        },
        {
            id: 2,
            url: 'https://www.youtube.com/watch?v=e4Ao-iNPPUc',
            title: 'Video 2',
            description: 'Another sample video description.',
            image: '/public/img/videos/imagem - 02.jpg'
        }
    ]);

    const addVideo = (video) => {
        setVideos((prevVideos) => [...prevVideos, { ...video, id: prevVideos.length + 1 }]);
    };

    const deleteVideo = (id) => {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    };

    return (
        <VideoContext.Provider value={{ videos, addVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideoContext = () => {
    return useContext(VideoContext);
};
