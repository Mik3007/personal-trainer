import React, { useEffect, useState } from 'react';
import { workoutPlanService } from '../services/api';

// Importa i tuoi file JSON degli esercizi
import petto from '../../../backend/exercises/petto.json';
import spalle from '../../../backend/exercises/spalle.json';
import bicipiti from '../../../backend/exercises/bicipiti.json';
import dorso from '../../../backend/exercises/dorso.json';
import tricipiti from '../../../backend/exercises/tricipiti.json';
import quadricipiti from '../../../backend/exercises/quadricipiti.json';
import bicipiteFemoraleGlutei from '../../../backend/exercises/bicipiteFemoraleGlutei.json';

const exercisesData = {
  ...petto,
  ...spalle,
  ...bicipiti,
  ...dorso,
  ...tricipiti,
  ...quadricipiti,
  ...bicipiteFemoraleGlutei,
};

const WorkoutPlanViewer = ({ userId, isAdmin }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await workoutPlanService.getOne(userId);
        if (response.data) {
          // Mappa gli ID degli esercizi ai dettagli completi
          const detailedExercises = response.data.exercises.map(ex => {
            const exerciseDetails = exercisesData[ex.exerciseId];
            return {
              ...ex,
              ...exerciseDetails,
            };
          });
          setWorkoutPlan({ ...response.data, exercises: detailedExercises });
        }
      } catch (error) {
        console.error('Errore nel recupero della scheda di allenamento:', error);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  const handleDeletePlan = async () => {
    if (window.confirm("Sei sicuro di voler cancellare questa scheda?")) {
      try {
        await workoutPlanService.delete(userId);
        setWorkoutPlan(null);  // Aggiorna lo stato per riflettere che la scheda è stata cancellata
      } catch (error) {
        console.error('Errore durante la cancellazione della scheda di allenamento:', error);
      }
    }
  };

  if (!workoutPlan) {
    return <p>Ancora nessuna scheda di allenamento.</p>;
  }

  return (
    <div className="workout-plan-viewer max-w-full mx-auto bg-gray-800 p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-3xl font-bold mb-6">Scheda di Allenamento</h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {workoutPlan.exercises.map((exercise, idx) => (
          <div 
            key={idx} 
            className="exercise-item p-6 bg-gray-700 rounded-lg w-[600px] mb-4"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-semibold">
                  Giorno {idx + 1}: {exercise.groupId.charAt(0).toUpperCase() + exercise.groupId.slice(1)}
                </h3>
              </div>
              <img
                src={`/images/${exercise.groupId}.jpg`}
                alt={`${exercise.groupId}`}
                className="h-20 w-20 object-cover rounded-full"
              />
            </div>
            <div className="text-gray-200">
              <p className="text-lg">Esercizio: {exercise.name || 'N/A'}</p>
              <p className="text-md">Serie: {exercise.sets || 'N/A'}</p>
              <p className="text-md">Ripetizioni: {exercise.reps || 'N/A'}</p>
              <p className="text-md">Tempo di recupero: {exercise.recoveryTime || 'N/A'}</p>
              {exercise.additionalInfo && (
                <p className="text-sm mt-2">Note: {exercise.additionalInfo}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleDeletePlan}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Cancella Scheda
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanViewer;
