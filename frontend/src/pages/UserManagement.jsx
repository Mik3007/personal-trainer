import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userService } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Stato per i risultati filtrati
  const [searchTerm, setSearchTerm] = useState(''); // Stato per il termine di ricerca
  const [isDeleting, setIsDeleting] = useState(false); // Stato per gestire la cancellazione
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
        setFilteredUsers(response.data); // Imposta gli utenti filtrati come l'intera lista all'inizio
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

  const getAvatarColor = (sesso) => {
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
  };

  // Funzione per gestire il termine di ricerca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter((user) =>
      `${user.nome} ${user.cognome}`.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Funzione per eliminare un utente
  const handleDelete = async (userId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      try {
        setIsDeleting(true);
        await userService.deleteUser(userId); // Assicurati che l'API userService abbia un metodo deleteUser
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user._id !== userId)
        );
        setIsDeleting(false);
      } catch (error) {
        console.error('Errore durante la cancellazione dell\'utente:', error);
        setIsDeleting(false);
      }
    }
  };

  // Varianti per Framer Motion con effetto bounce
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay: i * 0.1, // Delay per fare apparire le card una alla volta
      },
    }),
  };

  return (
    <div className="user-management-container min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#787878] p-8">
      <h2 className="italic text-5xl font-bold mb-28 text-purple-500 text-center">Atleti registrati</h2>
  
      {/* Barra di ricerca */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Cerca per nome o cognome"
          className="px-4 py-2 rounded-lg border border-gray-400 text-black w-1/2 sm:w-1/4 bg-[#1f2937]"
        />
      </div>
  
      {/* Griglia di utenti */}
      <motion.div
        className="user-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-20"
        initial="hidden"
        animate="visible"
      >
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user._id}
            className="user-card relative bg-gray-800 p-3 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 aspect-square flex flex-col justify-center items-center w-4/5 mx-auto hover:border hover:border-fuchsia-700"
            custom={index}
            variants={cardVariants}
            onClick={() => handleUserClick(user._id)}
          >
            <div className={`w-16 h-16 rounded-full ${getAvatarColor(user.sesso)} flex items-center justify-center text-white font-bold text-xl mb-2`}>
              {getInitials(user.nome, user.cognome)}
            </div>
            <h3 className="text-base font-semibold text-white text-center mt-1">
              {user.nome} {user.cognome}
            </h3>
            <p className="text-xs text-gray-300 mt-1 truncate max-w-full">{user.email}</p>
            {user.sesso && <p className="text-xs text-gray-400 mt-1 capitalize">{user.sesso}</p>}
  
            {/* Icona di eliminazione */}
            <button
              className="absolute bottom-2 right-2 text-fuchsia-700 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(user._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );  
};

export default UserManagement;
