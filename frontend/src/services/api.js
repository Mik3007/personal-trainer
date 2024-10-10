import axios from 'axios';

const API_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Operazioni CRUD per gli utenti
export const userService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getAllUsers: () => api.get('/admin/users'),
  promoteUser: (userId) => api.put(`/admin/users/promote/${userId}`),
  getUserById: (userId) => api.get(`/admin/users/${userId}`),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getBIAData: (userId) => api.get(userId ? `/bia/${userId}` : '/bia'),
  addBIAData: (userId, biaData) => api.post(userId ? `/bia/${userId}` : '/bia', biaData),
  deleteBIAData: (userId, biaId) => {
    console.log(`Deleting BIA data. UserId: ${userId}, BiaId: ${biaId}`);
    return api.delete(`/bia/${userId}/${biaId}`);
  },
  adminRegisterUser: (userData) => api.post('/admin/users/register', userData),
};

// Operazioni CRUD per i piani di allenamento
export const workoutPlanService = {
  getAll: () => api.get('/workout-plans'),
  getOne: (id) => api.get(`/workout-plans/${id}`),
  create: (planData) => api.post('/workout-plans', planData),
  update: async (id, planData) => {
    try {
      const response = await api.put(`/workout-plans/${id}`, planData);
      console.log("Risposta completa dal server:", response);
      return response.data;
    } catch (error) {
      console.error("Errore nella chiamata API di aggiornamento:", error);
      throw error;
    }
  },
  delete: (id) => api.delete(`/workout-plans/${id}`),
  getAllPlans: (userId) => api.get(`/workout-plans/${userId}/all`),
};

export const exerciseService = {
  create: async (exerciseData) => {
    try {
      const response = await api.post('/exercises', exerciseData);
      console.log('Risposta del server per la creazione dell\'esercizio:', response);
      return response;
    } catch (error) {
      console.error('Errore nella creazione dell\'esercizio:', error.response || error);
      throw error;
    }
  },
};;