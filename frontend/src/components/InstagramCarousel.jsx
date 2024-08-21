import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InstagramCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <div className="flex items-center justify-center">
        {videos.map((video, index) => {
          const offset = (index - currentIndex + videos.length) % videos.length;
          const isActive = offset === 0;
          const isPrev = offset === videos.length - 1;
          const isNext = offset === 1;

          return (
            <div
              key={video}
              className={`transition-all duration-300 ease-in-out ${
                isActive
                  ? 'w-3/4 opacity-100 z-20'
                  : isPrev || isNext
                  ? 'w-1/4 opacity-50 z-10'
                  : 'w-0 opacity-0 z-0'
              }`}
            >
              <div className={`px-2 ${isActive ? 'scale-100' : 'scale-95'}`}>
                <iframe
                  src={`https://www.instagram.com/p/${video}/embed`}
                  className="w-full aspect-square rounded-lg shadow-lg"
                  frameBorder="0"
                  scrolling="no"
                  allowtransparency="true"
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-30"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-30"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default InstagramCarousel;