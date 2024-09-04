import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const NavHero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
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
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-[#343434] via-transparent to-[#343434] rounded-full filter blur-md"></div>
                <img
                  src="/logo.png"
                  alt="Personal Trainer App Logo"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              </Link>
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
                >
                  Menu
                  <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                  >
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </motion.button>
                <motion.ul
                  variants={{
                    open: {
                      clipPath: "inset(0% 0% 0% 0% round 10px)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05,
                      },
                    },
                    closed: {
                      clipPath: "inset(10% 50% 90% 50% round 10px)",
                      transition: { type: "spring", bounce: 0, duration: 0.3 },
                    },
                  }}
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  style={{ pointerEvents: isOpen ? "auto" : "none" }}
                  className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#484bac] ring-1 ring-black ring-opacity-5"
                >
                  {isAuthenticated ? (
                    <>
                      {userRole === "admin" && (
                        <motion.li variants={itemVariants}>
                          <Link
                            to="/users/all"
                            className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                            role="menuitem"
                          >
                            Atleti
                          </Link>
                        </motion.li>
                      )}
                      <motion.li variants={itemVariants}>
                        <a
                          href="#contatti"
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                          role="menuitem"
                        >
                          Contatti
                        </a>
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </motion.li>
                    </>
                  ) : (
                    <>
                      <motion.li variants={itemVariants}>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                          role="menuitem"
                        >
                          Registra Utente
                        </Link>
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                          role="menuitem"
                        >
                          Login
                        </Link>
                      </motion.li>
                      <motion.li variants={itemVariants}>
                        <a
                          href="#contatti"
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                          role="menuitem"
                        >
                          Contatti
                        </a>
                      </motion.li>
                    </>
                  )}
                </motion.ul>
              </div>
            </div>
          </nav>

          <div className="flex-grow flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold mb-4">
              <span className="block">PLAN</span>
              <span className="block mt-2">WORK</span>
              <span className="block mt-2">REPEAT</span>
            </h1>
            <a
              href="https://www.instagram.com/francesco_raucci_pt?igsh=MTV0ZHk1dGQyaGd5ZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Francesco Raucci PT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavHero;
