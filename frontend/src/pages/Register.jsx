import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    repeatPassword: "",
    dataNascita: "",
    sesso: "",
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
    if (formData.password !== formData.repeatPassword) {
      setError("Le password non coincidono.");
      return;
    }
    try {
        const response = await userService.register(formData);
        if (response) {
          navigate('/login');
        }
      } catch (error) {
        console.error("Errore catturato:", error);
        setError('Errore durante la registrazione. Riprova.');
      }
      
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto border bg-gray-600 rounded-2xl text-white">
      <div className="mb-5">
        <label
          htmlFor="nome"
          className="block my-6 mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="cognome"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Cognome
        </label>
        <input
          type="text"
          id="cognome"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
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
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
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
      <div className="mb-5">
        <label
          htmlFor="repeatPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ripeti Password
        </label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="dataNascita"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Data di Nascita
        </label>
        <input
          type="date"
          id="dataNascita"
          name="dataNascita"
          value={formData.dataNascita}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="sesso"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Sesso
        </label>
        <select
          id="sesso"
          name="sesso"
          value={formData.sesso}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option value="">Seleziona...</option>
          <option value="M">Maschio</option>
          <option value="F">Femmina</option>
          <option value="Altro">Altro</option>
        </select>
      </div>
      <div className="flex items-start mb-5"></div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white bg-blue-700 hover:bg-blue-800 ..."
      >
        Registra
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default Register;
