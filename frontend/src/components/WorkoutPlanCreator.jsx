import React, { useState } from 'react';
import { workoutPlanService } from '../services/api';
import petto from '../../../backend/exercises/petto.json';
import spalle from '../../../backend/exercises/spalle.json';
import bicipiti from '../../../backend/exercises/bicipiti.json';
import dorso from '../../../backend/exercises/dorso.json';
import tricipiti from '../../../backend/exercises/tricipiti.json';
import quadricipiti from '../../../backend/exercises/quadricipiti.json';
import bicipiteFemoraleGlutei from '../../../backend/exercises/bicipiteFemoraleGlutei.json';

const WorkoutPlanCreator = ({ userId }) => {
  const [days, setDays] = useState([{ id: 1, muscleGroups: {} }]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [formData, setFormData] = useState({
    sets: '',
    reps: '',
    recoveryTime: '',
    additionalInfo: '',
  });

  const muscleGroups = {
    petto: petto,
    spalle: spalle,
    bicipiti: bicipiti,
    dorso: dorso,
    tricipiti: tricipiti,
    quadricipiti: quadricipiti,
    bicipiteFemoraleGlutei: bicipiteFemoraleGlutei,
  };

  const addDay = () => {
    setDays([...days, { id: days.length + 1, muscleGroups: {} }]);
  };

  const handleGroupChange = (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    setExercises(muscleGroups[groupId] || []);
    setSelectedExercise(null);
  };

  const handleExerciseChange = (event) => {
    const exerciseId = event.target.value;
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    setSelectedExercise(exercise);
  };

  const handleAddExercise = (dayId) => {
    if (!selectedExercise) return;

    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        const updatedMuscleGroups = { ...day.muscleGroups };
        if (!updatedMuscleGroups[selectedGroup]) {
          updatedMuscleGroups[selectedGroup] = [];
        }
        updatedMuscleGroups[selectedGroup].push({
          ...selectedExercise,
          sets: formData.sets,
          reps: formData.reps,
          recoveryTime: formData.recoveryTime,
          additionalInfo: formData.additionalInfo,
        });

        return {
          ...day,
          muscleGroups: updatedMuscleGroups,
        };
      }
      return day;
    });

    setDays(updatedDays);

    // Resetta il form dopo l'aggiunta di un esercizio
    setFormData({
      sets: '',
      reps: '',
      recoveryTime: '',
      additionalInfo: '',
    });
    setSelectedExercise(null);
  };

  const handleRemoveExercise = (dayId, group, exerciseIndex) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        const updatedMuscleGroups = { ...day.muscleGroups };
        updatedMuscleGroups[group] = updatedMuscleGroups[group].filter(
          (_, index) => index !== exerciseIndex
        );

        return {
          ...day,
          muscleGroups: updatedMuscleGroups,
        };
      }
      return day;
    });

    setDays(updatedDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutPlan = days.flatMap(day =>
      Object.keys(day.muscleGroups).flatMap(groupId =>
        day.muscleGroups[groupId].map(exercise => ({
          groupId,
          exerciseId: exercise.id,
          sets: exercise.sets,
          reps: exercise.reps,
          recoveryTime: exercise.recoveryTime,
          additionalInfo: exercise.additionalInfo,
        }))
      )
    );

    const payload = {
      userId,  // Assicurati che questo valore sia correttamente definito
      exercises: workoutPlan,  // Assicurati che 'workoutPlan' sia un array di esercizi correttamente formattato
    };

    try {
      const response = await workoutPlanService.create(payload);
      console.log('Scheda creata con successo:', response.data);
    } catch (error) {
      console.error('Errore durante la creazione della scheda:', error);
    }
  };

  return (
    <div className="workout-plan-creator max-w-full mx-auto bg-gray-800 p-8 rounded-lg shadow-lg flex flex-wrap gap-8">
      <h2 className="text-2xl font-bold mb-6 w-full">Crea Scheda di Allenamento</h2>
      {days.map((day, index) => (
        <div key={day.id} className="day-section mb-4 flex-1">
          <h3 className="text-xl font-semibold mb-2">Giorno {index + 1}</h3>
          <select
            onChange={handleGroupChange}
            className="group-select block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
            value={selectedGroup}
          >
            <option value="">Seleziona gruppo muscolare</option>
            <option value="petto">Petto</option>
            <option value="spalle">Spalle</option>
            <option value="bicipiti">Bicipiti</option>
            <option value="dorso">Dorso</option>
            <option value="tricipiti">Tricipiti</option>
            <option value="quadricipiti">Quadricipiti</option>
            <option value="bicipiteFemoraleGlutei">Bicipite Femorale e Glutei</option>
          </select>

          {selectedGroup && (
            <select
              onChange={handleExerciseChange}
              className="exercise-select block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
              value={selectedExercise?.id || ''}
            >
              <option value="">Seleziona esercizio</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          )}

          {selectedExercise && (
            <div>
              <input
                type="number"
                placeholder="Sets"
                value={formData.sets}
                className="block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
                onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
              />
              <input
                type="number"
                placeholder="Reps"
                value={formData.reps}
                className="block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
                onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tempo di recupero"
                value={formData.recoveryTime}
                className="block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
                onChange={(e) => setFormData({ ...formData, recoveryTime: e.target.value })}
              />
              <textarea
                placeholder="Ulteriori informazioni"
                value={formData.additionalInfo}
                className="block w-full p-2 mb-2 bg-gray-700 text-white rounded-lg"
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              />
              <button
                onClick={() => handleAddExercise(day.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Aggiungi Esercizio
              </button>
            </div>
          )}

          <div className="exercise-list mt-4">
            {Object.keys(day.muscleGroups).map((group, groupIdx) => (
              <div key={groupIdx} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  {group.charAt(0).toUpperCase() + group.slice(1)} - Esercizi:
                </h4>
                <ol className="list-decimal list-inside">
                  {day.muscleGroups[group].map((exercise, idx) => (
                    <li key={`${exercise.id}-${idx}`} className="exercise-item mb-2">
                      {exercise.name} - {exercise.sets}x{exercise.reps} ({exercise.recoveryTime})
                      <button
                        onClick={() => handleRemoveExercise(day.id, group, idx)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        Rimuovi
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="w-full flex justify-between items-center mt-4">
        <button
          onClick={addDay}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Aggiungi Giorno
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crea Scheda
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanCreator;
