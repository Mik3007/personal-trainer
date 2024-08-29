import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/api';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Tutti gli Utenti</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map(user => (
          <div key={user._id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>{user.nome} {user.cognome}</h3>
            <p>Email: {user.email}</p>
            <Link to={`/profile/${user._id}`}>Visualizza Profilo</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;