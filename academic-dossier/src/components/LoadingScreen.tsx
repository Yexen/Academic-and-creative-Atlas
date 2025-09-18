'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Additional delay for fade out
    }, 3000); // Show video for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!showVideo) {
    return (
      <div className={`fixed inset-0 bg-white z-50 transition-opacity duration-500 opacity-0 pointer-events-none`} />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => {
            console.error('Video failed to load');
            onLoadingComplete();
          }}
        >
          <source src="/loading-animation.mp4" type="video/mp4" />
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-academic-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-academic-brown font-medium">Loading...</p>
            </div>
          </div>
        </video>

        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-academic-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-academic-brown font-medium">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}