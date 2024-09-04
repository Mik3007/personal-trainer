import React, { useState, useEffect } from "react";
import { workoutPlanService } from "../services/api";
import muscleGroupsData from "../../../backend/exercises/gruppiMuscolari.json";

const WorkoutPlanViewer = ({ userId, isAdmin }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userId) {
        setError("ID utente non valido");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await workoutPlanService.getOne(userId);
        console.log("Dati ricevuti dall'API:", response.data); // Log per debugging
        if (response.data) {
          const groupedExercises = response.data.exercises.reduce((acc, ex) => {
            const dayKey = `Giorno ${ex.day}`;
            if (!acc[dayKey]) {
              acc[dayKey] = {};
            }
            if (!acc[dayKey][ex.groupId]) {
              acc[dayKey][ex.groupId] = [];
            }
            acc[dayKey][ex.groupId].push(ex);
            return acc;
          }, {});

          setWorkoutPlan({
            _id: response.data._id,
            exercises: groupedExercises,
          });
        } else {
          setError("Nessuna scheda di allenamento trovata");
        }
      } catch (error) {
        console.error(
          "Errore nel recupero della scheda di allenamento:",
          error
        );
        setError(
          "Impossibile caricare la scheda di allenamento. Riprova più tardi."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutPlan();
  }, [userId]);

  const toggleDay = (dayKey) => {
    setExpandedDays((prevExpandedDays) => ({
      ...prevExpandedDays,
      [dayKey]: !prevExpandedDays[dayKey],
    }));
  };

  const getMuscleGroupInfo = (groupId) => {
    const muscleGroup = muscleGroupsData.muscleGroups.find(
      (group) => group.id === groupId
    );
    return muscleGroup || { name: groupId, image: "/default-muscle.webp" };
  };

  const handleDeletePlan = async () => {
    if (!workoutPlan || !workoutPlan._id) {
      console.error("ID della scheda non disponibile");
      return;
    }

    if (window.confirm("Sei sicuro di voler cancellare questa scheda?")) {
      try {
        await workoutPlanService.delete(workoutPlan._id);
        setWorkoutPlan(null);
      } catch (error) {
        console.error(
          "Errore durante la cancellazione della scheda di allenamento:",
          error
        );
        setError("Impossibile eliminare la scheda. Riprova più tardi.");
      }
    }
  };

  if (isLoading) {
    return <p>Caricamento della scheda di allenamento...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!workoutPlan) {
    return (
      <div>
        <p>Nessuna scheda di allenamento disponibile.</p>
        {isAdmin && <p>È possibile creare una nuova scheda di allenamento.</p>}
      </div>
    );
  }

  const workoutDays = Object.entries(workoutPlan.exercises);
  const numberOfDays = workoutDays.length;

  return (
    <div className="workout-plan-viewer max-w-full mx-auto bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-3xl font-bold mb-6 text-white">Workout</h2>

      {/* Layout desktop e tablet */}
      <div className="hidden sm:flex sm:flex-wrap sm:justify-center sm:gap-4" 
           style={{ 
             '--num-days': numberOfDays, 
             '--day-width': 'calc((100% - (var(--num-days) - 1) * 1rem) / var(--num-days))'
           }}>
        {workoutDays.map(([dayKey, groups]) => (
          <div key={dayKey} className="bg-gray-800 rounded-lg shadow-lg p-4" style={{ flexBasis: 'var(--day-width)', maxWidth: 'var(--day-width)' }}>
            <h3 className="text-3xl font-semibold mb-2 text-red-600">
              {dayKey}
            </h3>
            {Object.entries(groups).map(([groupId, exercises]) => {
              const { name: groupName, image: groupImage } = getMuscleGroupInfo(groupId);
              return (
                <div key={groupId} className="mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-2xl text-white">{groupName}</p>
                    <img
                      src={groupImage}
                      alt={groupName}
                      className="h-20 w-20 object-cover rounded-full"
                    />
                  </div>
                  <ul className="list-disc list-inside mt-2">
                    {exercises.map((exercise, exIdx) => (
                      <li key={exIdx} className="text-gray-200 mb-2 text-lg">
                        <span className="font-semibold">
                          {exercise.name || "Esercizio senza nome"}
                        </span>
                        <span className="ml-2">
                          {exercise.sets} x {exercise.reps} rec {exercise.recoveryTime}
                          {exercise.additionalInfo && ` (${exercise.additionalInfo})`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Layout mobile */}
      <div className="sm:hidden">
        {Object.entries(workoutPlan.exercises).map(([dayKey, groups]) => (
          <div key={dayKey} className="mb-4">
            <div className="exercise-item bg-gray-700 bg-opacity-70 rounded-lg">
              <h2
                className="text-xl font-bold text-white cursor-pointer p-4"
                onClick={() => toggleDay(dayKey)}
              >
                {dayKey}
              </h2>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedDays[dayKey] ? "max-h-full" : "max-h-0 overflow-hidden"
                }`}
              >
                {Object.entries(groups).map(([groupId, exercises]) => {
                  const { name: groupName, image: groupImage } = getMuscleGroupInfo(groupId);
                  return (
                    <div key={groupId} className="p-4 border-t border-gray-600">
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xl text-white">{groupName}</p>
                        <img
                          src={groupImage}
                          alt={groupName}
                          className="h-12 w-12 object-cover"
                        />
                      </div>
                      <ul className="list-disc list-inside mt-2 text-white">
                        {exercises.map((exercise, exIdx) => (
                          <li key={exIdx} className="mb-2">
                            <span className="font-semibold">
                              {exercise.name || "Esercizio senza nome"}
                            </span>
                            <span className="ml-2">
                              {exercise.sets} x {exercise.reps} rec {exercise.recoveryTime}
                              {exercise.additionalInfo && ` (${exercise.additionalInfo})`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAdmin && workoutPlan && (
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
