import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">Personal Trainer App</Link>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white mr-4">Profile</Link>
              <Link to="/workouts" className="text-white mr-4">Workouts</Link>
              <span className="text-white mr-4">{user.name}</span>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;