import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { setAuthToken } from "./services/api";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setIsAdmin(role === "admin");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isAdmin && location.pathname === "/login") {
        navigate("/users/all");
      } else if (isAuthenticated && !isAdmin && location.pathname === "/login") {
        navigate("/profile");
      }
    }
  }, [isAuthenticated, isAdmin, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/" && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
          <Route path="/profile" element={isAuthenticated ? (isAdmin ? <Navigate to="/users/all" /> : <Profile isAdmin={isAdmin}/>) : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={isAuthenticated ? <Profile isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="/users/all" element={isAuthenticated && isAdmin ? <UserManagement /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
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