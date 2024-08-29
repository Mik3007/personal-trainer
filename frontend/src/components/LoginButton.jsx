import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/sync`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Errore nella sincronizzazione con il backend');
          }

          console.log('Dati utente sincronizzati con successo');
        } catch (error) {
          console.error('Errore durante la sincronizzazione:', error);
        }
      }
    };

    syncUserWithBackend();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return <button onClick={() => loginWithRedirect()}>Login / Register</button>;
};

export default LoginButton;
