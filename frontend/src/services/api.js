import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API_URL:', API_URL);

// Configurazione di axios con l'URL base
const api = axios.create({
  baseURL: API_URL,
});

// Operazioni CRUD per gli utenti
export const userService = {
  getProfile: (token) => api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  updateProfile: (userData, token) => api.put('/users/profile', userData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getAllUsers: (token) => api.get('/users/all', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  promoteUser: (userId, token) => api.put(`/users/promote/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Operazioni CRUD per i piani di allenamento
export const workoutPlanService = {
  getAll: (token) => api.get('/workout-plans', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getOne: (id, token) => api.get(`/workout-plans/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  create: (planData, token) => api.post('/workout-plans', planData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, planData, token) => api.put(`/workout-plans/${id}`, planData, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/workout-plans/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};

// Operazioni di autenticazione
export const authService = {
  syncUser: (token) => api.post('/auth/sync', {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};
