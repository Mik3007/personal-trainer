import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="bg-[#343434] text-white"
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Personal Trainer App Logo"
              className="h-20 w-auto"
            />
          </Link>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(!isOpen)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
            >
              Menu
              <motion.div
                variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
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
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
              className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#484bac] ring-1 ring-black ring-opacity-5"
            >
              <motion.li variants={itemVariants}>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                >
                  Home
                </Link>
              </motion.li>

              {userRole === "admin" && (
                <>
                  <motion.li variants={itemVariants}>
                    <Link
                      to="/users/all"
                      className="block px-4 py-2 text-sm text-white hover:bg-blue-500"
                    >
                      Atleti
                    </Link>
                  </motion.li>
                </>
              )}

              <motion.li variants={itemVariants}>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-500"
                >
                  Logout
                </button>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
