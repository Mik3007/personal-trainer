import React from 'react';
import NavHero from '../components/NavHero';
// import InstagramCarousel from '../components/InstagramCarousel';
import Footer from '../components/Footer';
import ServiceCards from '../components/ServiceCards';

const Home = () => {
  const instagramVideos = ['C7jM1Fbobco', 'C6n9k38oRg9', 'C4aXU38Iq63'];

  return (
    <div className="flex flex-col min-h-screen home">
      <NavHero />
      <main className="flex-grow">
      <ServiceCards />
        <section className="py-12 bg-gradient-to-b from-[#4B4B4B] to-[#7A7A7A]">
          <div className="container mx-auto px-4">
            {/* <InstagramCarousel videos={instagramVideos} /> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;