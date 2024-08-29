import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="bg-[#343434] text-white">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Personal Trainer App Logo" className="h-20 w-auto" />
          </Link>
          <div>
            {isAuthenticated ? (
              <>
                <Link to="/users">All Users</Link>
                <Link to="/profile" className="mr-4 hover:text-gray-300">Profile</Link>
                <Link to="/workouts" className="mr-4 hover:text-gray-300">Workouts</Link>
                <Link to="/register" className="mr-4 hover:text-gray-300">Registra Utente</Link>
                <button onClick={() => logout({ returnTo: window.location.origin })} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200">
                  Log Out
                </button>
              </>
            ) : (
              <button onClick={() => loginWithRedirect()} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200">
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;