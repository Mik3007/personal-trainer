import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    console.log('Dati inviati:', formData);
    try {
      const response = await userService.register(formData);
      console.log('Registrazione riuscita:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Errore durante la registrazione:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-[#343434] to-[#787878] flex items-center justify-center">
      <div className="w-full max-w-4xl p-8">
        <div className="grid lg:grid-cols-2 gap-4 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-white p-8 flex justify-center">
            <div>
              <img src="LogoScritta.jpg" alt="logo" className="w-68" />
            </div>
          </div>

          <div className="bg-[rgb(56,56,56)] p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-white">Registrazione</h3>
              </div>

              {['nome', 'cognome', 'email', 'password', 'repeatPassword'].map((field) => (
                <div key={field} className="mb-4">
                  <label className="text-gray-300 text-sm mb-2 block capitalize">
                    {field === 'repeatPassword' ? 'Ripeti Password' : field}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name={field}
                      type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full text-sm text-white bg-gray-700 border border-gray-600 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Inserisci ${field === 'repeatPassword' ? 'nuovamente la password' : field}`}
                    />
                  </div>
                </div>
              ))}

              <div className="mb-4">
                <label className="text-gray-300 text-sm mb-2 block">Data di Nascita</label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    name="dataNascita"
                    value={formData.dataNascita}
                    onChange={handleChange}
                    className="w-full text-sm text-white bg-gray-700 border border-gray-600 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-gray-300 text-sm mb-2 block">Sesso</label>
                <div className="relative flex items-center">
                  <select
                    name="sesso"
                    value={formData.sesso}
                    onChange={handleChange}
                    className="w-full text-sm text-white bg-gray-700 border border-gray-600 px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleziona...</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                  Registrati
                </button>
              </div>
              <p className="text-sm mt-8 text-center text-gray-300">
                Hai già un account? 
                <Link to="/login" className="text-blue-400 font-semibold hover:underline ml-1 whitespace-nowrap">
                  Accedi
                </Link>
              </p>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;