import React from "react";
import "../styles/VideoCard.css";


function VideoCard({ title, thumbnail }) {
  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} className="video-thumbnail" />
      <h3 className="video-title">{title}</h3>
    </div>
  );
}

export default VideoCard;
