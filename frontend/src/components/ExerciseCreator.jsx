import React, { useState } from 'react';
import { exerciseService } from '../services/api';

const ExerciseCreator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const muscleGroups = [
    "petto", "spalle", "bicipiti", "dorso", "tricipiti", 
    "quadricipiti", "femorali", "addome", "polpacci"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dati esercizio da inviare:', { name: exerciseName, groupId: muscleGroup });
    try {
      const response = await exerciseService.create({ name: exerciseName, groupId: muscleGroup });
      console.log('Risposta dal server:', response);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      setIsModalOpen(false);
      setExerciseName('');
      setMuscleGroup('');
    } catch (error) {
      console.error('Errore dettagliato:', error.response || error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
        type="button"
      >
        Crea Esercizio
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Crea Nuovo Esercizio</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="Nome dell'esercizio"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                required
              />
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

      {showSuccessPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          Esercizio creato con successo!
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          Errore durante la creazione dell'esercizio. Riprova più tardi.
        </div>
      )}
    </>
  );
};

export default ExerciseCreator;