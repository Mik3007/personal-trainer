import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(config => {
  console.log('Intestazioni di richiesta:', config.headers);
  return config;
});

// Operazioni CRUD per gli utenti
export const userService = {
  register: (userData) => api.post('/auth/register', userData), // Invariato
  login: (userData) => api.post('/auth/login', userData), // Invariato
  getProfile: () => api.get('/users/profile'), // Resta invariato
  updateProfile: (userData) => api.put('/users/profile', userData), // Resta invariato
  getAllUsers: () => api.get('/admin/users'), // Modificato: /users/all -> /admin/users/all
  promoteUser: (userId) => api.put(`/admin/users/promote/${userId}`), // Modificato: /users/promote -> /admin/users/promote
  getUserById: (userId) => api.get(`/admin/users/${userId}`), // Modificato: /api/users/:id -> /admin/users/:id
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token impostato nelle intestazioni:', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token rimosso dalle intestazioni');
  }
};

// Operazioni CRUD per i piani di allenamento
export const workoutPlanService = {
  getAll: () => api.get('/workout-plans'), // Invariato
  getOne: (id) => api.get(`/workout-plans/${id}`), // Invariato
  create: (planData) => api.post('/workout-plans', planData), // Invariato
  update: (id, planData) => api.put(`/workout-plans/${id}`, planData), // Invariato
  delete: (id) => api.delete(`/workout-plans/${id}`), // Invariato
};
