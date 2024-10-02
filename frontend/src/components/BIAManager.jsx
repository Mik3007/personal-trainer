import React, { useState, useEffect } from "react";
import { userService } from "../services/api";
import BIAChart from "./BIAChart";

const BIAManager = ({ userId }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [biaData, setBiaData] = useState([]);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [hasBiaData, setHasBiaData] = useState(false);
=======
  const [hasBiaData, setHasBiaData] = useState(null);
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076
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

  // Funzione per recuperare i dati BIA
  const fetchBiaData = async () => {
<<<<<<< HEAD
    setLoading(true); // Inizia il caricamento
=======
    setLoading(true);
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076
    try {
      console.log(`Fetching BIA data for userId: ${userId}`);
      const response = await userService.getBIAData(userId);
      
      if (response.data && response.data.length > 0) {
        setBiaData(response.data);
<<<<<<< HEAD
        setHasBiaData(true);
      } else {
        setBiaData([]);
        setHasBiaData(false); // Aggiorna stato se non ci sono dati
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati BIA:", error);
      setBiaData([]); // Assicurati che l'array sia vuoto in caso di errore
      setHasBiaData(false); // Assicurati che lo stato sia aggiornato
    } finally {
      setLoading(false); // Ferma il caricamento
    }
  };
  
  
=======
        localStorage.setItem(`biaData_${userId}`, JSON.stringify(response.data));
      } else {
        const savedData = localStorage.getItem(`biaData_${userId}`);
        if (savedData) {
          setBiaData(JSON.parse(savedData));
        } else {
          setBiaData([]);
        }
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati BIA:", error);
      const savedData = localStorage.getItem(`biaData_${userId}`);
      if (savedData) {
        setBiaData(JSON.parse(savedData));
      } else {
        setBiaData([]);
      }
    } finally {
      setLoading(false);
    }
  };
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076

  const checkBiaData = async () => {
    if (!userId) {
      console.error("ID utente non definito.");
      return;
    }
  
    try {
      const userProfile = await userService.getUserById(userId);
<<<<<<< HEAD
      setHasBiaData(userProfile.hasBiaData); // Imposta lo stato di presenza dei dati
  
      // Se ha dati BIA, carica i dati
=======
      setHasBiaData(userProfile.hasBiaData);
      
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076
      if (userProfile.hasBiaData) {
        await fetchBiaData();
      } else {
        setBiaData([]); // Se non ha dati, imposta l'array come vuoto
      }
    } catch (error) {
      console.error("Errore nel controllo dei dati BIA:", error);
      setHasBiaData(false);
      setBiaData([]); // Imposta l'array come vuoto in caso di errore
    }
  };

  useEffect(() => {
    checkBiaData(); // Solo per controllare i dati BIA
  }, [userId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setNewBiaData({ ...newBiaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const newBia = await userService.addBIAData(userId, newBiaData);
      // Aggiungi la nuova misurazione all'array esistente
      setBiaData((prevData) => [...prevData, newBia.data]);
=======
      await userService.addBIAData(userId, newBiaData);
      await fetchBiaData();
      setHasBiaData(true);
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076
      closeModal();
      // Reset del modulo
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
<<<<<<< HEAD
    try {
      console.log(`Attempting to delete BIA with userId: ${userId}, biaId: ${biaId}`);
      await userService.deleteBIAData(userId, biaId);
      console.log("BIA deletion successful");
      await fetchBiaData(); // Aggiorna i dati dopo l'eliminazione
    } catch (error) {
      console.error("Errore nell'eliminazione dei dati BIA:", error);
      if (error.response && error.response.status === 404) {
        alert("La misurazione BIA non è stata trovata. Potrebbe essere già stata eliminata.");
        await fetchBiaData(); // Aggiorna i dati per riflettere lo stato attuale
      } else {
        alert(`Errore nell'eliminazione: ${error.response?.data?.message || error.message}`);
=======
    if (window.confirm("Sei sicuro di voler eliminare questa misurazione BIA?")) {
      try {
        await userService.deleteBIAData(userId, biaId);
        await fetchBiaData();
      } catch (error) {
        console.error("Errore nell'eliminazione dei dati BIA:", error);
>>>>>>> 724be7a04fd789b68314a2262d61efcf9443b076
      }
    }
  };

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  return (
    <div>
      {/* Pulsante per aprire il modale di inserimento BIA - ora sempre visibile */}
      <button
        onClick={openModal}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out"
        type="button"
      >
        Aggiungi nuova misurazione BIA
      </button>

      {/* Modale per l'inserimento di nuovi dati BIA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-20 z-50">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-gray-800 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium leading-6 text-white mb-4">
              Inserisci nuova BIA
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
            <h3 className="text-lg font-semibold mb-2">Storico misurazioni BIA</h3>
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
