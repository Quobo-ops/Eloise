import React, { useState, useEffect, useRef } from 'react';

const Background = ({ activeMarker }) => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState('/background.mp4');

  // Determine which video to play
  const targetVideo = activeMarker?.video || '/background.mp4';

  useEffect(() => {
    // Fade transition when video changes
    if (targetVideo !== currentVideo) {
      setCurrentVideo(targetVideo);
    }
  }, [targetVideo, currentVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [currentVideo]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        key={currentVideo}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        src={currentVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/video-poster.jpg"
      />
      
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-10" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
    </div>
  );
};

export default Background;

