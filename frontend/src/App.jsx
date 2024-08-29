import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import { setAuthToken, authService } from './services/api';

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          setAuthToken(token);
          await authService.syncUser();
          console.log('User synced with backend');
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />} 
        />
        <Route 
          path="/users" 
          element={isAuthenticated ? <Users /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;