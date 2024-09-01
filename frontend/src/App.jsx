import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminStatus = localStorage.getItem("isAdmin");

    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setIsAdmin(adminStatus === "true");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAdmin && location.pathname === "/login") {
      navigate("/users/all");
    } else if (isAuthenticated && !isAdmin && location.pathname === "/login") {
      navigate("/profile");
    }
  }, [isAuthenticated, isAdmin, location.pathname, navigate]);

  const handleLogin = (token, isAdmin) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    setAuthToken(token);

    if (isAdmin) {
      navigate("/users/all");
    } else {
      navigate("/profile");
    }
  };

  console.log(
    "Stato corrente - Autenticato:",
    isAuthenticated,
    "Admin:",
    isAdmin
  );

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
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                isAdmin ? (
                  <Navigate to="/users/all" />
                ) : (
                  <Profile />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile/:id"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/all"
            element={
              isAuthenticated && isAdmin ? (
                <UserManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
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
