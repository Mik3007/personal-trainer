import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InstagramCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videosPerSlide = 3; // Numero di video da mostrare per volta

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + videosPerSlide < videos.length
        ? prevIndex + videosPerSlide
        : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - videosPerSlide >= 0
        ? prevIndex - videosPerSlide
        : videos.length - videosPerSlide
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-500 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-30"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex space-x-4 w-full px-8 overflow-hidden">
          {videos
            .slice(currentIndex, currentIndex + videosPerSlide)
            .map((video, index) => (
              <div key={index} className="w-1/3 flex-shrink-0">
                <iframe
                  src={`https://www.instagram.com/p/${video}/embed`}
                  className="w-full aspect-square rounded-lg shadow-lg bg-transparent"
                  frameBorder="0"
                  scrolling="no"
                  allowtransparency="true"
                ></iframe>
              </div>
            ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-30"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default InstagramCarousel;
