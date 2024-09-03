import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userService } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Errore nel recupero degli utenti:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const getInitials = (nome, cognome) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
  };

  function getAvatarColor(sesso) {
    if (!sesso) {
      return 'bg-gray-500'; // Imposta un colore di default se il sesso è undefined
    }

    switch (sesso.toLowerCase()) {
      case 'maschio':
        return 'bg-blue-500';
      case 'femmina':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500'; // Colore di fallback se il sesso non è maschio o femmina
    }
  }

  return (
    <div className="user-management-container min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#787878] p-8">
      <h2 className="text-3xl font-bold mb-8 text-[#b72db0] text-center">Gestione Utenti</h2>
      <motion.div 
        className="user-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {users.map((user) => (
          <motion.div
            key={user._id}
            className="user-card bg-gray-800 p-3 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 aspect-square flex flex-col justify-center items-center w-4/5 mx-auto"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleUserClick(user._id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-16 h-16 rounded-full ${getAvatarColor(user.sesso)} flex items-center justify-center text-white font-bold text-xl mb-2`}>
              {getInitials(user.nome, user.cognome)}
            </div>
            <h3 className="text-base font-semibold text-white text-center mt-1">{user.nome} {user.cognome}</h3>
            <p className="text-xs text-gray-300 mt-1 truncate max-w-full">{user.email}</p>
            {user.sesso && <p className="text-xs text-gray-400 mt-1 capitalize">{user.sesso}</p>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserManagement;
