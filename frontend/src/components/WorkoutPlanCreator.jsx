import React, { useState } from "react";
import { workoutPlanService } from "../services/api";
import petto from "../../../backend/exercises/petto.json";
import spalle from "../../../backend/exercises/spalle.json";
import bicipiti from "../../../backend/exercises/bicipiti.json";
import dorso from "../../../backend/exercises/dorso.json";
import tricipiti from "../../../backend/exercises/tricipiti.json";
import quadricipiti from "../../../backend/exercises/quadricipiti.json";
import femorali from "../../../backend/exercises/femorali.json";
import addome from "../../../backend/exercises/addome.json";
import polpacci from "../../../backend/exercises/polpacci.json";

// Oggetto che raggruppa tutti gli esercizi per gruppo muscolare
const muscleGroups = {
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

const WorkoutPlanCreatorModal = ({ userId, onPlanCreated }) => {
  const [days, setDays] = useState([
    {
      id: 1,
      muscleGroups: {},
      selectedGroup: "",
      selectedExercise: null,
      formData: {
        sets: "",
        reps: "",
        recoveryTime: "",
        additionalInfo: "",
      },
    },
  ]);
  const [exercises, setExercises] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState({ 1: true });
  const [exerciseCounter, setExerciseCounter] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDay = (dayId) => {
    setExpandedDays((prev) => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const addDay = () => {
    const newDayId = days.length + 1;
    setDays([
      ...days,
      {
        id: newDayId,
        muscleGroups: {},
        selectedGroup: "",
        selectedExercise: null,
        formData: {
          sets: "",
          reps: "",
          recoveryTime: "",
          additionalInfo: "",
        },
      },
    ]);
    setExpandedDays({ [newDayId]: true });
  };

  const removeDay = (dayId) => {
    setDays(days.filter((day) => day.id !== dayId));
    setExpandedDays((prev) => {
      const newExpandedDays = { ...prev };
      delete newExpandedDays[dayId];
      return newExpandedDays;
    });
  };

  const handleGroupChange = (dayId, event) => {
    const groupId = event.target.value;
    setDays(
      days.map((day) =>
        day.id === dayId
          ? { ...day, selectedGroup: groupId, selectedExercise: null }
          : day
      )
    );
    setExercises(muscleGroups[groupId] || []);
  };

  const handleExerciseChange = (dayId, event) => {
    const exerciseId = event.target.value;
    setDays(
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              selectedExercise: exercises.find((ex) => ex.id === exerciseId),
            }
          : day
      )
    );
  };

  const handleFormDataChange = (dayId, field, value) => {
    setDays(
      days.map((day) =>
        day.id === dayId
          ? { ...day, formData: { ...day.formData, [field]: value } }
          : day
      )
    );
  };

  const handleAddExercise = (dayId) => {
    setDays((prevDays) => {
      const updatedDays = prevDays.map((day) => {
        if (day.id === dayId) {
          const updatedMuscleGroups = { ...day.muscleGroups };
          if (!updatedMuscleGroups[day.selectedGroup]) {
            updatedMuscleGroups[day.selectedGroup] = [];
          }
          updatedMuscleGroups[day.selectedGroup].push({
            ...day.selectedExercise,
            uniqueId: `${day.id}-${day.selectedGroup}-${exerciseCounter}`,
            sets: day.formData.sets,
            reps: day.formData.reps,
            recoveryTime: day.formData.recoveryTime,
            additionalInfo: day.formData.additionalInfo,
          });

          return {
            ...day,
            muscleGroups: updatedMuscleGroups,
            selectedGroup: "",
            selectedExercise: null,
            formData: {
              sets: "",
              reps: "",
              recoveryTime: "",
              additionalInfo: "",
            },
          };
        }
        return day;
      });

      setExerciseCounter((prev) => prev + 1);
      return updatedDays;
    });
  };

  const handleRemoveExercise = (dayId, group, uniqueId) => {
    setDays((prevDays) => 
      prevDays.map((day) => {
        if (day.id === dayId) {
          const updatedMuscleGroups = { ...day.muscleGroups };
          updatedMuscleGroups[group] = updatedMuscleGroups[group].filter(
            (exercise) => exercise.uniqueId !== uniqueId
          );
          return { ...day, muscleGroups: updatedMuscleGroups };
        }
        return day;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutPlan = days.flatMap((day) =>
      Object.entries(day.muscleGroups).flatMap(([groupId, exercises]) =>
        exercises.map((exercise) => {
          const originalExercise = muscleGroups[groupId].find(
            (e) => e.id === exercise.id
          );
          return {
            day: day.id,
            groupId,
            exerciseId: exercise.id,
            name: originalExercise ? originalExercise.name : exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            recoveryTime: exercise.recoveryTime,
            additionalInfo: exercise.additionalInfo,
          };
        })
      )
    );

    const payload = {
      userId,
      exercises: workoutPlan,
    };

    console.log("Payload inviato al backend:", payload);
    try {
      const response = await workoutPlanService.create(payload);
      console.log("Scheda creata con successo:", response.data);
      onPlanCreated(response.data);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      closeModal();
    } catch (error) {
      console.error("Errore durante la creazione della scheda:", error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 3000);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out flex items-center"
        type="button"
      >
        Crea Scheda di Allenamento
      </button>

      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden={!isModalOpen}
        className={`${
          isModalOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-4xl max-h-full">
          <div className="relative bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-white">
                Crea Scheda di Allenamento
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              {/* Layout desktop */}
              <div className="hidden sm:flex flex-wrap -mx-2">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                  >
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          Giorno {day.id}
                        </h3>
                        <button
                          onClick={() => removeDay(day.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <select
                        onChange={(e) => handleGroupChange(day.id, e)}
                        className="group-select block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                        value={day.selectedGroup}
                      >
                        <option value="">Seleziona gruppo muscolare</option>
                        <option value="petto">Petto</option>
                        <option value="spalle">Spalle</option>
                        <option value="bicipiti">Bicipiti</option>
                        <option value="dorso">Dorso</option>
                        <option value="tricipiti">Tricipiti</option>
                        <option value="quadricipiti">Quadricipiti</option>
                        <option value="femorali">Femorali</option>
                        <option value="addome">Addome</option>
                        <option value="polpacci">Polpacci</option>
                      </select>

                      {day.selectedGroup && (
                        <select
                          onChange={(e) => handleExerciseChange(day.id, e)}
                          className="exercise-select block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                          value={day.selectedExercise?.id || ""}
                        >
                          <option value="">Seleziona esercizio</option>
                          {exercises.map((exercise) => (
                            <option key={exercise.id} value={exercise.id}>
                              {exercise.name}
                            </option>
                          ))}
                        </select>
                      )}

                      {day.selectedExercise && (
                        <div>
                          <input
                            type="number"
                            placeholder="Sets"
                            value={day.formData.sets}
                            className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                            onChange={(e) =>
                              handleFormDataChange(
                                day.id,
                                "sets",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="number"
                            placeholder="Reps"
                            value={day.formData.reps}
                            className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                            onChange={(e) =>
                              handleFormDataChange(
                                day.id,
                                "reps",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="text"
                            placeholder="Tempo di recupero"
                            value={day.formData.recoveryTime}
                            className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                            onChange={(e) =>
                              handleFormDataChange(
                                day.id,
                                "recoveryTime",
                                e.target.value
                              )
                            }
                          />
                          <textarea
                            placeholder="Ulteriori informazioni"
                            value={day.formData.additionalInfo}
                            className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                            onChange={(e) =>
                              handleFormDataChange(
                                day.id,
                                "additionalInfo",
                                e.target.value
                              )
                            }
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
                        {Object.entries(day.muscleGroups).map(
                          ([group, exercises]) => (
                            <div key={group} className="mb-4">
                              <h4 className="text-lg font-semibold mb-2 text-white">
                                {group.charAt(0).toUpperCase() + group.slice(1)}{" "}
                                - Esercizi:
                              </h4>
                              <ul className="list-disc list-inside text-white">
                                {exercises.map((exercise) => (
                                  <li
                                    key={exercise.uniqueId}
                                    className="exercise-item mb-2"
                                  >
                                    {exercise.name} - {exercise.sets}x
                                    {exercise.reps} ({exercise.recoveryTime})
                                    <button
                                      onClick={() =>
                                        handleRemoveExercise(day.id, group, exercise.uniqueId)
                                      }
                                      className="ml-4 text-red-500 hover:text-red-700"
                                    >
                                      Rimuovi
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Layout mobile */}
              <div className="sm:hidden">
                {days.map((day) => (
                  <div key={day.id} className="mb-4">
                    <div className="bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center p-4">
                        <h3
                          className="text-xl font-semibold text-white cursor-pointer"
                          onClick={() => toggleDay(day.id)}
                        >
                          Giorno {day.id}
                        </h3>
                        <button
                          onClick={() => removeDay(day.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      {expandedDays[day.id] && (
                        <div className="p-4">
                          <select
                            onChange={(e) => handleGroupChange(day.id, e)}
                            className="group-select block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                            value={day.selectedGroup}
                          >
                            <option value="">Seleziona gruppo muscolare</option>
                            <option value="petto">Petto</option>
                            <option value="spalle">Spalle</option>
                            <option value="bicipiti">Bicipiti</option>
                            <option value="dorso">Dorso</option>
                            <option value="tricipiti">Tricipiti</option>
                            <option value="quadricipiti">Quadricipiti</option>
                            <option value="femorali">Femorali</option>
                            <option value="addome">Addome</option>
                            <option value="polpacci">Polpacci</option>
                          </select>

                          {day.selectedGroup && (
                            <select
                              onChange={(e) => handleExerciseChange(day.id, e)}
                              className="exercise-select block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                              value={day.selectedExercise?.id || ""}
                            >
                              <option value="">Seleziona esercizio</option>
                              {exercises.map((exercise) => (
                                <option key={exercise.id} value={exercise.id}>
                                  {exercise.name}
                                </option>
                              ))}
                            </select>
                          )}

                          {day.selectedExercise && (
                            <div>
                              <input
                                type="number"
                                placeholder="Sets"
                                value={day.formData.sets}
                                className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                                onChange={(e) =>
                                  handleFormDataChange(
                                    day.id,
                                    "sets",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="number"
                                placeholder="Reps"
                                value={day.formData.reps}
                                className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                                onChange={(e) =>
                                  handleFormDataChange(
                                    day.id,
                                    "reps",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                placeholder="Tempo di recupero"
                                value={day.formData.recoveryTime}
                                className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                                onChange={(e) =>
                                  handleFormDataChange(
                                    day.id,
                                    "recoveryTime",
                                    e.target.value
                                  )
                                }
                              />
                              <textarea
                                placeholder="Ulteriori informazioni"
                                value={day.formData.additionalInfo}
                                className="block w-full p-2 mb-2 bg-gray-600 text-white rounded-lg"
                                onChange={(e) =>
                                  handleFormDataChange(
                                    day.id,
                                    "additionalInfo",
                                    e.target.value
                                  )
                                }
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
                            {Object.entries(day.muscleGroups).map(
                              ([group, exercises]) => (
                                <div key={group} className="mb-4">
                                  <h4 className="text-lg font-semibold mb-2 text-white">
                                    {group.charAt(0).toUpperCase() +
                                      group.slice(1)}{" "}
                                    - Esercizi:
                                  </h4>
                                  <ul className="list-disc list-inside text-white">
                                    {exercises.map((exercise) => (
                                      <li
                                        key={exercise.uniqueId}
                                        className="exercise-item mb-2"
                                      >
                                        {exercise.name} - {exercise.sets}x
                                        {exercise.reps} ({exercise.recoveryTime}
                                        )
                                        <button
                                          onClick={() =>
                                            handleRemoveExercise(
                                              day.id,
                                              group,
                                              exercise.uniqueId
                                            )
                                          }
                                          className="ml-4 text-red-500 hover:text-red-700"
                                        >
                                          Rimuovi
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-between items-center mt-4">
                <button
                  onClick={addDay}
                  className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-600"
                >
                  Aggiungi Giorno
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gray-600 text-white px-2 py-2 rounded hover:bg-green-600 sm:px-2 sm:py-1"
                >
                  Crea Scheda
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 sm:px-2 sm:py-1"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          Scheda creata con successo!
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          Errore durante la creazione della scheda. Riprova più tardi.
        </div>
      )}
    </>
  );
};

export default WorkoutPlanCreatorModal;
