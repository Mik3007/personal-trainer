import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// Operazioni CRUD per gli utenti
export const userService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getAllUsers: () => api.get('/users/all'),
  promoteUser: (userId) => api.put(`/users/promote/${userId}`),
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Operazioni CRUD per i piani di allenamento
export const workoutPlanService = {
  getAll: () => api.get('/workout-plans'),
  getOne: (id) => api.get(`/workout-plans/${id}`),
  create: (planData) => api.post('/workout-plans', planData),
  update: (id, planData) => api.put(`/workout-plans/${id}`, planData),
  delete: (id) => api.delete(`/workout-plans/${id}`),
};

// Operazioni di autenticazione
export const authService = {
  syncUser: (token) => api.post('/auth/sync', {}, {
    headers: { Authorization: `Bearer ${token}` }
  }),
};
