import React from 'react';
import MotivationalQuote from '../components/MotivationalQuote'; // Assicurati che questo componente esista

const Profile = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#797979] flex flex-col justify-center items-center text-white p-4">
      <MotivationalQuote className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center" />

    </div>
  );
};

export default Profile;