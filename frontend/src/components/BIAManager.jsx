import React, { useState, useEffect } from "react";
import { userService } from "../services/api";
import BIAChart from "./BIAChart";

const BIAManager = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [biaData, setBiaData] = useState([]);
  const [hasBiaData, setHasBiaData] = useState(null); // Nuovo stato per tracciare se l'utente ha dati BIA
  const [newBiaData, setNewBiaData] = useState({
    weight: "",
    fatPercentage: "",
    musclePercentage: "",
    waterPercentage: "",
    boneMass: "",
    bmi: "",
  });

  const fieldLabels = {
    weight: "Peso (kg)",
    fatPercentage: "Percentuale di grasso (%)",
    musclePercentage: "Percentuale di muscolo (%)",
    waterPercentage: "Percentuale di acqua (%)",
    boneMass: "Massa ossea (kg)",
    bmi: "Indice di massa corporea (BMI)",
  };

  useEffect(() => {
    checkBiaData();
  }, [userId]);

  const checkBiaData = async () => {
    try {
      // Controlla se l'utente ha dati BIA
      const userProfile = await userService.getUserById(userId);
      setHasBiaData(userProfile.hasBiaData);
      
      if (userProfile.hasBiaData) {
        fetchBiaData();
      }
    } catch (error) {
      console.error("Errore nel controllo dei dati BIA:", error);
      setHasBiaData(false);
    }
  };

  const fetchBiaData = async () => {
    try {
      const response = await userService.getBIAData(userId);
      setBiaData(response.data);
    } catch (error) {
      console.error("Errore nel recupero dei dati BIA:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setNewBiaData({ ...newBiaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.addBIAData(userId, newBiaData);
      await fetchBiaData();
      setHasBiaData(true);
      closeModal();
      setNewBiaData({
        weight: "",
        fatPercentage: "",
        musclePercentage: "",
        waterPercentage: "",
        boneMass: "",
        bmi: "",
      });
    } catch (error) {
      console.error("Errore nell'invio dei dati BIA:", error);
    }
  };

  const handleDelete = async (biaId) => {
    if (window.confirm("Sei sicuro di voler eliminare questa misurazione BIA?")) {
      try {
        await userService.deleteBIAData(userId, biaId);
        await fetchBiaData();
      } catch (error) {
        console.error("Errore nell'eliminazione dei dati BIA:", error);
      }
    }
  };

  if (hasBiaData === null) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      {/* Pulsante per aprire il modale di inserimento BIA */}
      <button
        onClick={openModal}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
        type="button"
      >
        {biaData.length > 0
          ? "Aggiungi nuova misurazione BIA"
          : "Inserisci prima misurazione BIA"}
      </button>

      {/* Modale per l'inserimento di nuovi dati BIA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-20 z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-gray-800 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium leading-6 text-white mb-4">
              {biaData.length > 0 ? "Inserisci nuova BIA" : "Crea BIA"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries(fieldLabels).map(([key, label]) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-white mb-1"
                  >
                    {label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    id={key}
                    name={key}
                    value={newBiaData[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-lg"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Salva
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visualizzazione del grafico BIA e dello storico delle misurazioni */}
      {biaData.length > 0 && (
        <div className="mt-4">
          <BIAChart data={biaData} />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Storico misurazioni BIA
            </h3>
            <ul className="space-y-2">
              {biaData.map((bia) => (
                <li
                  key={bia._id}
                  className="flex justify-between items-center bg-gray-700 p-2 rounded"
                >
                  <span>{new Date(bia.date).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleDelete(bia._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Elimina
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BIAManager;
