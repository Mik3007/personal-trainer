import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Assicurati che questa sia la URL corretta del tuo backend

const api = axios.create({
  baseURL: API_URL,
});

// Funzione per impostare il token di autenticazione
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Funzioni per le chiamate API relative agli utenti
export const getUserProfile = async (token) => {
    try {
      const response = await api.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

// Funzioni per le chiamate API relative alle schede d'allenamento
export const createWorkoutPlan = async (workoutPlanData) => {
  try {
    const response = await api.post('/workout-plans', workoutPlanData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserWorkoutPlans = async (userId) => {
  try {
    const response = await api.get(`/workout-plans/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWorkoutPlan = async (planId) => {
  try {
    const response = await api.get(`/workout-plans/${planId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWorkoutPlan = async (planId, workoutPlanData) => {
  try {
    const response = await api.put(`/workout-plans/${planId}`, workoutPlanData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWorkoutPlan = async (planId) => {
  try {
    const response = await api.delete(`/workout-plans/${planId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateExerciseWeight = async (planId, exerciseId, weight) => {
  try {
    const response = await api.patch(`/workout-plans/${planId}/exercise/${exerciseId}/peso`, { peso: weight });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getExercises = async () => {
  try {
    const response = await api.get('/workout-plans/exercises');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;