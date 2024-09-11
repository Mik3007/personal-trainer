import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService, setAuthToken } from '../services/api';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userService.login(formData);
      console.log('Risposta del backend al login:', response.data);
      const { token, isAdmin } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', isAdmin ? 'admin' : 'user');
      setAuthToken(token);
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);

      console.log('Ruolo salvato nel localStorage:', localStorage.getItem('role'));

      if (isAdmin) {
        navigate('/users/all');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Login fallito, per favore riprova.');
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#4B4B4B] to-[#7A7A7A] flex items-center justify-center">
      <div className="w-full max-w-4xl p-8">
        <div className="grid lg:grid-cols-2 gap-4 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-white p-8 flex justify-center ">
            <div>
              <img src="LogoScritta.jpg" alt="logo" className="w-68" />
            </div>
          </div>

          <div className="bg-[rgb(56,56,56)] p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-white">Accedi</h3>
              </div>

              <div className="mb-4">
                <label className="text-gray-300 text-sm my-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-white bg-gray-700 border border-gray-600 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Inserisci email"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#9CA3AF" stroke="#9CA3AF" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-gray-300 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-sm text-white bg-gray-700 border border-gray-600 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Inserisci password"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#9CA3AF" stroke="#9CA3AF" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-24">
                <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                  Accedi
                </button>
              </div>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
              <p className="text-sm mt-8 text-center text-gray-300">
                Non hai un account? 
                <Link to="/register" className="text-blue-400 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Registrati qui
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;