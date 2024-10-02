import React, { useState, useEffect } from "react";
import { workoutPlanService } from "../services/api";
import muscleGroupsData from "../../../backend/exercises/gruppiMuscolari.json";
import petto from "../../../backend/exercises/petto.json";
import spalle from "../../../backend/exercises/spalle.json";
import bicipiti from "../../../backend/exercises/bicipiti.json";
import dorso from "../../../backend/exercises/dorso.json";
import tricipiti from "../../../backend/exercises/tricipiti.json";
import quadricipiti from "../../../backend/exercises/quadricipiti.json";
import femorali from "../../../backend/exercises/femorali.json";
import addome from "../../../backend/exercises/addome.json";
import polpacci from "../../../backend/exercises/polpacci.json";

const WorkoutPlanViewer = ({ userId, isAdmin }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(null);
  const [previousPlans, setPreviousPlans] = useState([]); // Stato per memorizzare le schede precedenti dell'utente

  const exercisesByGroup = {
    petto,
    spalle,
    bicipiti,
    dorso,
    tricipiti,
    quadricipiti,
    femorali,
    addome,
    polpacci,
  };

  const getExercisesByGroupId = (groupId) => {
    return exercisesByGroup[groupId] || [];
  };

  const getExerciseById = (groupId, exerciseId) => {
    const exercises = getExercisesByGroupId(groupId);
    return exercises.find((ex) => ex.id === exerciseId) || null;
  };

  // Funzione per recuperare le schede precedenti dell'utente (fino a un massimo di 3)
  const fetchPreviousPlans = async () => {
    try {
      const response = await workoutPlanService.getAllPlans(userId);
      setPreviousPlans(response.data.slice(0, 3)); // Assicurati che 'response.data' sia l'array di schede
    } catch (error) {
      console.error("Errore nel recupero delle schede precedenti:", error);
    }
  };

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      if (!userId) {
        setWorkoutPlan(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await workoutPlanService.getOne(userId);
        if (response && response.data) {
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
            createdAt: response.data.createdAt,
            exercises: groupedExercises,
          });
          fetchPreviousPlans();
        } else {
          setWorkoutPlan(null);
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

  const handleEditPlan = () => {
    setIsEditing(true);
    const editablePlan = JSON.parse(JSON.stringify(workoutPlan));
    setEditedPlan(editablePlan);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPlan(null);
  };

  const handleSaveEdit = async () => {
    try {
      const formattedExercises = Object.entries(editedPlan.exercises).flatMap(
        ([day, groups]) =>
          Object.entries(groups).flatMap(([groupId, exercises]) =>
            exercises.map((exercise) => ({
              ...exercise,
              day: parseInt(day.replace("Giorno ", "")),
              groupId,
            }))
          )
      );

      const planToSend = {
        ...editedPlan,
        exercises: formattedExercises,
      };

      console.log("Dati inviati per l'aggiornamento:", planToSend);
      const updatedPlan = await workoutPlanService.update(
        workoutPlan._id,
        planToSend
      );
      console.log("Risposta dal server:", updatedPlan);

      if (updatedPlan && Array.isArray(updatedPlan.exercises)) {
        const groupedExercises = updatedPlan.exercises.reduce((acc, ex) => {
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
          ...updatedPlan,
          exercises: groupedExercises,
        });
      } else {
        console.error(
          "La risposta del server non contiene esercizi validi:",
          updatedPlan
        );
        throw new Error("Formato di risposta del server non valido");
      }

      setIsEditing(false);
      setEditedPlan(null);
    } catch (error) {
      console.error("Errore durante il salvataggio delle modifiche:", error);
      setError("Impossibile salvare le modifiche. Riprova più tardi.");
    }
  };

  const handleExerciseChange = (
    dayKey,
    groupId,
    exerciseIndex,
    field,
    value
  ) => {
    setEditedPlan((prevPlan) => {
      const newPlan = JSON.parse(JSON.stringify(prevPlan));
      if (field === "id") {
        const selectedExercise = getExerciseById(groupId, value);
        if (selectedExercise) {
          newPlan.exercises[dayKey][groupId][exerciseIndex] = {
            ...newPlan.exercises[dayKey][groupId][exerciseIndex],
            id: selectedExercise.id,
            name: selectedExercise.name,
          };
        }
      } else {
        newPlan.exercises[dayKey][groupId][exerciseIndex][field] = value;
      }
      console.log("Updated Plan:", JSON.stringify(newPlan, null, 2));
      return newPlan;
    });
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
      <div className="mt-8">
        <p>Nessuna scheda di allenamento disponibile.</p>
        {isAdmin && <p>È possibile creare una nuova scheda di allenamento.</p>}
      </div>
    );
  }

  return (
    <div className="workout-plan-viewer max-w-full mx-auto bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-3xl font-bold mb-6 text-white">Workout</h2>

      {/* Visualizzazione schede precedenti */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white">Schede precedenti</h3>
        <ul className="list-disc list-inside text-white">
          {previousPlans.length > 0 ? (
            previousPlans.map((plan) => (
              <li key={plan._id}>
                <button
                  onClick={() => {
                    const groupedExercises = plan.exercises.reduce(
                      (acc, ex) => {
                        const dayKey = `Giorno ${ex.day}`;
                        if (!acc[dayKey]) {
                          acc[dayKey] = {};
                        }
                        if (!acc[dayKey][ex.groupId]) {
                          acc[dayKey][ex.groupId] = [];
                        }
                        acc[dayKey][ex.groupId].push(ex);
                        return acc;
                      },
                      {}
                    );

                    setWorkoutPlan({
                      _id: plan._id,
                      createdAt: plan.createdAt,
                      exercises: groupedExercises,
                    });
                  }}
                  className="text-blue-400 underline"
                >
                  {new Date(plan.createdAt).toLocaleDateString()}
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-400">
              Nessuna scheda precedente disponibile.
            </p>
          )}
        </ul>
        {/* Visualizzazione della data della scheda corrente */}
        {workoutPlan && workoutPlan.createdAt && (
          <p className="text-white mt-4">
            Data ultima scheda:{" "}
            <span className="text-blue-400">
              {new Date(workoutPlan.createdAt).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>

      {isEditing && editedPlan ? (
        <div>
          {Object.entries(editedPlan.exercises).map(([dayKey, groups]) => (
            <div key={dayKey} className="mb-6 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">
                {dayKey}
              </h3>
              {Object.entries(groups).map(([groupId, exercises]) => (
                <div key={`${dayKey}-${groupId}`} className="mt-4">
                  <p className="text-xl text-white mb-2">
                    {getMuscleGroupInfo(groupId).name}
                  </p>
                  {exercises.map((exercise, exIdx) => (
                    <div
                      key={`${dayKey}-${groupId}-${exIdx}`}
                      className="mb-3 flex flex-wrap items-center"
                    >
                      <select
                        value={exercise.exerciseId}
                        onChange={(e) =>
                          handleExerciseChange(
                            dayKey,
                            groupId,
                            exIdx,
                            "exerciseId",
                            e.target.value
                          )
                        }
                        className="bg-gray-600 text-white p-2 rounded mr-2 mb-2 flex-grow"
                      >
                        {getExercisesByGroupId(groupId).map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleExerciseChange(
                            dayKey,
                            groupId,
                            exIdx,
                            "sets",
                            e.target.value
                          )
                        }
                        className="bg-gray-600 text-white p-2 rounded w-16 mr-2 mb-2"
                        placeholder="Sets"
                      />
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleExerciseChange(
                            dayKey,
                            groupId,
                            exIdx,
                            "reps",
                            e.target.value
                          )
                        }
                        className="bg-gray-600 text-white p-2 rounded w-16 mr-2 mb-2"
                        placeholder="Reps"
                      />
                      <input
                        type="text"
                        value={exercise.recoveryTime}
                        onChange={(e) =>
                          handleExerciseChange(
                            dayKey,
                            groupId,
                            exIdx,
                            "recoveryTime",
                            e.target.value
                          )
                        }
                        className="bg-gray-600 text-white p-2 rounded w-24 mb-2"
                        placeholder="Recupero"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSaveEdit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mr-4"
            >
              Salva Modifiche
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Annulla
            </button>
          </div>
        </div>
      ) : (
        // Visualizzazione normale
        <>
          {/* Layout desktop e tablet */}
          <div
            className="hidden sm:flex sm:flex-wrap sm:justify-center sm:gap-4"
            style={{
              "--num-days": Object.keys(workoutPlan.exercises).length,
              "--day-width":
                "calc((100% - (var(--num-days) - 1) * 1rem) / var(--num-days))",
            }}
          >
            {Object.entries(workoutPlan.exercises).map(([dayKey, groups]) => (
              <div
                key={dayKey}
                className="bg-gray-700 rounded-lg shadow-lg p-4"
                style={{
                  flexBasis: "var(--day-width)",
                  maxWidth: "var(--day-width)",
                }}
              >
                <h3 className="text-4xl font-semibold mb-2 text-red-600">
                  {dayKey}
                </h3>
                {Object.entries(groups).map(([groupId, exercises]) => {
                  const { name: groupName, image: groupImage } =
                    getMuscleGroupInfo(groupId);
                  return (
                    <div key={groupId} className="mt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-2xl text-white">{groupName}</p>
                        <img
                          src={groupImage}
                          alt={groupName}
                          className="h-16 w-16 object-cover rounded-full"
                        />
                      </div>
                      {exercises.map((exercise, exIdx) => (
                        <div key={exIdx} className="mb-4">
                          <p className="text-xl text-red-600">
                            {exercise.name}
                          </p>
                          <p className="text-gray-300">
                            {exercise.sets} serie di {exercise.reps} ripetizioni
                          </p>
                          <p className="text-gray-400">
                            Recupero: {exercise.recoveryTime} min
                          </p>
                          {exercise.additionalInfo && (
                            <p className="text-gray-500">
                              Note: {exercise.additionalInfo}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Layout mobile - con apertura a click */}
          <div className="sm:hidden">
            {Object.entries(workoutPlan.exercises).map(([dayKey, groups]) => (
              <div key={dayKey} className="mb-4">
                <div className="exercise-item bg-gray-700 rounded-lg">
                  <h2
                    className="text-xl font-bold text-white cursor-pointer p-4"
                    onClick={() => toggleDay(dayKey)}
                  >
                    {dayKey}
                  </h2>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedDays[dayKey]
                        ? "max-h-full"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    {Object.entries(groups).map(([groupId, exercises]) => {
                      const { name: groupName, image: groupImage } =
                        getMuscleGroupInfo(groupId);
                      return (
                        <div
                          key={groupId}
                          className="p-4 border-t border-gray-600"
                        >
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-lg text-white">{groupName}</p>
                            <img
                              src={groupImage}
                              alt={groupName}
                              className="h-12 w-12 object-cover rounded-full"
                            />
                          </div>
                          {exercises.map((exercise, exIdx) => (
                            <div key={exIdx} className="mb-4">
                              <p className="text-lg font-bold text-red-600">
                                {exercise.name}
                              </p>
                              <p className="text-gray-300">
                                {exercise.sets} serie di {exercise.reps}{" "}
                                ripetizioni
                              </p>
                              <p className="text-gray-400">
                                Recupero: {exercise.recoveryTime} secondi
                              </p>
                              {exercise.additionalInfo && (
                                <p className="text-gray-500">
                                  Note: {exercise.additionalInfo}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isAdmin && !isEditing && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleEditPlan}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-4"
          >
            Modifica Scheda
          </button>
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
