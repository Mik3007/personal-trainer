import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Workouts from './pages/Workouts';
import CreateWorkout from './pages/CreateWorkout';

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  console.log('isAuthenticated:', isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/create-workout" element={<CreateWorkout />} />
        </Routes>
    </Router>
  )
}

export default App