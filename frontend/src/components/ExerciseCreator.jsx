import React, { useState } from 'react';
import { exerciseService } from '../services/api';

// Componente per la creazione di nuovi esercizi
const ExerciseCreator = () => {
  // Stati per gestire l'apertura del modale e i dati dell'esercizio
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  // Stati per gestire i popup di successo e errore
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  // Nuovo stato per il messaggio di errore dettagliato
  const [errorMessage, setErrorMessage] = useState('');

  // Array dei gruppi muscolari disponibili
  const muscleGroups = [
    "petto", "spalle", "bicipiti", "dorso", "tricipiti", 
    "quadricipiti", "femorali", "addome", "polpacci"
  ];

  // Gestisce il form per creare un nuovo esercizio
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dati esercizio da inviare:', { name: exerciseName, groupId: muscleGroup });
    try {
      // Invia i dati al server per creare l'esercizio
      const response = await exerciseService.create({ name: exerciseName, groupId: muscleGroup });
      console.log('Risposta dal server:', response);
      // Mostra il popup di successo per 3 secondi
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      // Chiude il modale e resetta i campi
      setIsModalOpen(false);
      setExerciseName('');
      setMuscleGroup('');
    } catch (error) {
      console.error('Errore dettagliato:', error.response || error);
      // Aggiorna il messaggio di errore con dettagli più specifici
      setErrorMessage(error.response?.data?.message || error.message || 'Errore sconosciuto');
      // Mostra il popup di errore per 3 secondi
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    }
  };

  return (
    <>
      {/* Pulsante per aprire il modale di creazione esercizio */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
        type="button"
      >
        Crea Esercizio
      </button>

      {/* Modale per la creazione di un nuovo esercizio */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Crea Nuovo Esercizio</h2>
            <form onSubmit={handleSubmit}>
              {/* Input per il nome dell'esercizio */}
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="Nome dell'esercizio"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                required
              />
              {/* Select per il gruppo muscolare */}
              <select
                value={muscleGroup}
                onChange={(e) => setMuscleGroup(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                required
              >
                <option value="">Seleziona gruppo muscolare</option>
                {muscleGroups.map((group) => (
                  <option key={group} value={group}>
                    {group.charAt(0).toUpperCase() + group.slice(1)}
                  </option>
                ))}
              </select>
              {/* Pulsanti per creare o annullare */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Crea
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup di successo */}
      {showSuccessPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          Esercizio creato con successo!
        </div>
      )}

      {/* Popup di errore */}
      {showErrorPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          Errore durante la creazione dell'esercizio: {errorMessage}
        </div>
      )}
    </>
  );
};

export default ExerciseCreator;
