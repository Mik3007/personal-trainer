import React from 'react';
import NavHero from '../components/NavHero';
import InstagramCarousel from '../components/InstagramCarousel';
import Footer from '../components/Footer';

const Home = () => {
  const instagramVideos = ['C7jM1Fbobco', 'C6n9k38oRg9', 'C4aXU38Iq63'];

  return (
    <div className="flex flex-col min-h-screen">
      <NavHero />
      <main className="flex-grow">
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-6xl font-bold text-center mb-8 font-serif">Tips</h2>
            <InstagramCarousel videos={instagramVideos} />
          </div>
        </section>
        {/* Altre sezioni della pagina... */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;