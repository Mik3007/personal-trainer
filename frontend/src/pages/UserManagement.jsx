import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await userService.getAllUsers();  // Chiamata all'endpoint /users/all
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
  
    return (
      <div className="user-management-container max-w-full mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Gestione Utenti</h2>
        <div className="user-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="user-card bg-gray-700 p-4 rounded-lg shadow-md text-white cursor-pointer hover:bg-gray-600"
              onClick={() => handleUserClick(user._id)}
            >
              <h3 className="text-xl font-semibold">{user.nome} {user.cognome}</h3>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default UserManagement