import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userService } from '../services/api';

const CreateUserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    dataNascita: '',
    sesso: '',
    role: 'user',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {['nome', 'cognome', 'email', 'password', 'dataNascita', 'sesso', 'role'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {field === 'sesso' ? (
            <select
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Seleziona...</option>
              <option value="M">Maschio</option>
              <option value="F">Femmina</option>
              <option value="Altro">Altro</option>
            </select>
          ) : field === 'role' ? (
            <select
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="user">Utente</option>
              <option value="admin">Amministratore</option>
            </select>
          ) : (
            <input
              id={field}
              name={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : field === 'dataNascita' ? 'date' : 'text'}
              value={formData[field]}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crea Utente
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Annulla
        </button>
      </div>
    </form>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Errore nel recupero degli utenti:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserClick = useCallback((userId) => {
    navigate(`/profile/${userId}`);
  }, [navigate]);

  const getInitials = useCallback((nome, cognome) => {
    return `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();
  }, []);

  const getAvatarColor = useCallback((sesso) => {
    if (!sesso) return 'bg-gray-500';
    switch (sesso.toLowerCase()) {
      case 'maschio': return 'bg-blue-500';
      case 'femmina': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  }, []);

  const handleSearchChange = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      `${user.nome} ${user.cognome}`.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users]);

  const handleDelete = useCallback(async (userId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo utente?')) {
      try {
        await userService.deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user._id !== userId)
        );
      } catch (error) {
        console.error('Errore durante la cancellazione dell\'utente:', error);
        alert('Si è verificato un errore durante l\'eliminazione dell\'utente. Riprova.');
      }
    }
  }, []);

  const handleCreateUser = useCallback(async (userData) => {
    try {
      const response = await userService.adminRegisterUser(userData);
      console.log('Utente creato:', response.data);
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Errore durante la creazione dell\'utente:', error);
      alert('Si è verificato un errore durante la creazione dell\'utente. Riprova.');
    }
  }, [fetchUsers]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    }),
    hover: {
      scale: 1.10, 
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="user-management-container min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#787878] p-8">
      <h2 className="italic text-5xl font-bold mb-28 text-purple-500 text-center">Atleti registrati</h2>
      
      <div className="mb-10 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
        >
          Crea Utente
        </button>
      </div>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Ricerca Atleta"
          className="px-4 py-2 rounded-lg border border-gray-400 text-white w-1/2 sm:w-1/4 bg-[#1f2937]"
        />
      </div>

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
            whileHover="hover"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Crea Nuovo Utente</h2>
            <CreateUserForm 
              onSubmit={handleCreateUser}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;