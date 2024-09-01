import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./services/api";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/profile" 
          element={
            isAuthenticated 
              ? <Profile />
              : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/users/all" 
          element={
            isAuthenticated && userRole === 'admin' 
              ? <UserManagement /> 
              : <Navigate to={isAuthenticated ? "/profile" : "/login"} />
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;