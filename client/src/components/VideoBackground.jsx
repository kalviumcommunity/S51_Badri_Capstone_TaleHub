import React, { useState, useRef } from "react";
import "./VideoBackground.css";

const VideoBackground = ({ videoSrc, sectionId, children, aspectRatio = 16 / 9 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const containerRef = useRef(null);

  const scrollToSection = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div
      className="container"
      onClick={scrollToSection}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isPlaying && children}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="background-video"
        src={videoSrc}
      />
    </div>
  );
};

export default VideoBackground;
