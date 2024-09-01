import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService, setAuthToken } from '../services/api';


const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(`Campo aggiornato: ${e.target.name}, Valore: ${e.target.value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Tentativo di login con:', formData);
      const response = await userService.login(formData);
      if (response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // Salva il ruolo
        setAuthToken(response.data.token);
        setIsAuthenticated(true);
        console.log('Login effettuato, token salvato:', response.data.token);
        
        // Reindirizza in base al ruolo
        if (response.data.role === 'admin') {
          navigate('/users/all');
        } else {
          navigate('/profile');
        }
      }    
    } catch (error) {
      console.error('Errore durante il login:', error);
      setError('Credenziali non valide. Riprova.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-[250px] bg-gray-700">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default Login;
