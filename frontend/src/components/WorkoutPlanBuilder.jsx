import React, { useState, useEffect } from 'react';

const TrainingPlan = () => {
  const [days, setDays] = useState([{}]); // Inizialmente un giorno
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

  useEffect(() => {
    // Fetch per ottenere i gruppi muscolari dal backend
    fetch('/api/muscle-groups') 
      .then(res => res.json())
      .then(data => setMuscleGroups(data))
      .catch(err => console.error('Errore nel caricamento dei gruppi muscolari:', err));
  }, []);

  const addDay = () => {
    setDays([...days, {}]);
  };

  return (
    <div className="p-4 bg-gray-700 text-white">
      <h2 className="text-2xl mb-4">Creazione Scheda Allenamento</h2>
      {days.map((day, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl">Giorno {index + 1}</h3>
          <div className="mb-2">
            <label className="block text-sm mb-1">Gruppo Muscolare:</label>
            <select
              value={selectedMuscleGroup}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
              className="w-full p-2 rounded bg-gray-600"
            >
              <option value="">Seleziona un Gruppo Muscolare</option>
              {muscleGroups.map(group => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          {/* Qui aggiungeremo il dropdown degli esercizi e altri campi */}
        </div>
      ))}
      <button onClick={addDay} className="mt-4 p-2 bg-blue-600 rounded">Aggiungi Giorno</button>
    </div>
  );
};

export default TrainingPlan;
