import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MotivationalQuote from './MotivationalQuote';

const NavHero = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Personal Trainer App Logo" className="h-20 w-auto" />
          </Link>
          <div>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mr-4 text-white hover:text-gray-300 ">Profile</Link>
                <Link to="/workouts" className="mr-4 text-white hover:text-gray-300">Workouts</Link>
                <button onClick={() => logout({ returnTo: window.location.origin })} className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
                  Log Out
                </button>
              </>
            ) : (
              <button onClick={() => loginWithRedirect()} className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-contain bg-center"
          style={{ 
            backgroundImage: `url('/sfondoHero.jpg')`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center 45%', 
            backgroundRepeat: 'no-repeat', 
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold mb-4"> 
            {/* Modificato per una dimensione del testo più flessibile */}
            <span className="block">PLAN</span>
            <span className="block mt-2">WORK</span>
            <span className="block mt-2">REPEAT</span>
          </h1>
          <MotivationalQuote />
          <a 
            href="https://www.instagram.com/francesco_raucci_pt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-6 bg-white text-blue-500 px-6 py-2 md:px-8 md:py-3 rounded-full text-lg md:text-xl font-semibold hover:bg-gray-200 transition duration-300"
          >
            Inizia
          </a>
          <p className="mt-6 text-lg md:text-xl">@francesco_raucci_pt</p>
        </div>
      </div>
    </div>
  );
};

export default NavHero;
