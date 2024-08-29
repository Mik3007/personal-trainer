import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const InstagramCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videosPerSlide = 2; // Mostra solo 2 video per slide per renderli più grandi

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
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#4B4B4B] to-[#6D6D6D]">
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between">
          {/* Pulsante per scorrere a sinistra */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-all z-30"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Contenitore dei video con transizione */}
          <div className="flex w-full transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentIndex * (100 / videosPerSlide)}%)` }}>
            {videos.map((video, index) => (
              <div key={index} className="w-1/2 flex-shrink-0 p-2"> {/* Cambia w-1/3 a w-1/2 per mostrare 2 video per slide */}
                <iframe
                  src={`https://www.instagram.com/p/${video}/embed`}
                  className="w-full aspect-video rounded-lg shadow-lg bg-transparent"
                  style={{ border: "none" }}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  Header="none"
                ></iframe>
              </div>
            ))}
          </div>

          {/* Pulsante per scorrere a destra */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 transition-all z-30"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramCarousel;
