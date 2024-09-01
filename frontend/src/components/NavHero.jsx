import React from "react";
import { Link } from "react-router-dom";

const NavHero = () => {
  const isAuthenticated = localStorage.getItem("token");
  console.log("isAuthenticated:", isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="relative text-white">
      <div className="w-full h-[100vh] md:h-[100vh] relative overflow-auto">
        <div
          className="absolute inset-0 bg-contain bg-center"
          style={{
            backgroundImage: `url('/sfondoHero.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center 45%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(75, 75, 75, 0.5) 80%, #4B4B4B 95%)`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <div className="absolute inset-0 flex flex-col">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Personal Trainer App Logo"
                  className="h-20 w-auto"
                />
              </Link>
              <div>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="ml-4 text-white hover:text-gray-300"
                    >
                      Profilo
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="ml-4 text-white hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="ml-4 text-white hover:text-gray-300"
                    >
                      Registra Utente
                    </Link>
                    <Link
                      to="/login"
                      className="ml-4 text-white hover:text-gray-300"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <div className="flex-grow flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold mb-4">
              <span className="block">PLAN</span>
              <span className="block mt-2">WORK</span>
              <span className="block mt-2">REPEAT</span>
            </h1>
            {/* MotiviationalQuote Component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHero;
