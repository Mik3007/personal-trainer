import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Usa un percorso relativo
  timeout: 10000,
});

// Interceptor per le richieste
api.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

// Interceptor per le risposte
api.interceptors.response.use(
  response => {
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  error => {
    console.log('Response Error:', error);
    if (error.response) {
      console.log('Error Data:', error.response.data);
      console.log('Error Status:', error.response.status);
      console.log('Error Headers:', error.response.headers);
    } else if (error.request) {
      console.log('Error Request:', error.request);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;