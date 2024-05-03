import React, { useState, useRef } from "react";
import "./VideoBackground.css";
const VideoBackground = ({ videoSrc, children, aspectRatio = 16 / 9 }) => {
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

  return (
    <div
      className="container"
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
