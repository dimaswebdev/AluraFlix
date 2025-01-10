import React from "react";
import Slider from "react-slick";
import "./VideoGallery.css";

function VideoGallery({ videos, sectionTitle }) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="video-gallery">
      <h2 className="section-title">{sectionTitle}</h2>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="video-slide">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={video.title} />
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.genres}</p>
              <p>
                {video.match} | {video.age} | {video.season} | {video.quality}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default VideoGallery;
