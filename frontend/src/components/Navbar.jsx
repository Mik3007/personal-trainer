import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

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
                {userRole === 'admin' && <Link to="/users/all" className="mr-4 hover:text-gray-300">Atleti</Link>}
                <Link to="/" className="mr-4 hover:text-gray-300">Home</Link>
                <button onClick={handleLogout} className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
