import axios from 'axios';

// Funzione per ottenere un token di accesso per l'API di gestione di Auth0
const getManagementApiToken = async () => {
  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Errore nell\'ottenere il token di gestione Auth0:', error);
    throw error;
  }
};

// Funzione per ottenere i dettagli dell'utente da Auth0
export const getUserDetails = async (userId) => {
  try {
    const token = await getManagementApiToken();
    const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dettagli utente da Auth0:', error);
    throw error;
  }
};