import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userService, workoutService } from '../services/api';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProfileAndWorkout = async () => {
      try {
        const profileResponse = await userService.getProfile();
        setProfile(profileResponse.data);
        setIsAdmin(profileResponse.data.ruolo === 'admin');

        const workoutResponse = await workoutService.getAll();
        setWorkout(workoutResponse.data[0]); // Assumiamo che ogni utente abbia una sola scheda
      } catch (error) {
        console.error('Error fetching profile or workout:', error);
      }
    };

    if (isAuthenticated) {
      fetchProfileAndWorkout();
    }
  }, [isAuthenticated]);

  const handleWorkoutUpdate = async (updatedWorkout) => {
    try {
      await workoutService.update(workout._id, updatedWorkout);
      setWorkout(updatedWorkout);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Benvenuto, {profile.nome} {profile.cognome}!</h2>
      <p>Email: {profile.email}</p>

      <h3>La tua scheda di allenamento:</h3>
      {workout ? (
        <div>
          <h4>{workout.nome}</h4>
          <p>{workout.descrizione}</p>
          {/* Mostra gli esercizi della scheda */}
          {isAdmin && (
            <button onClick={() => handleWorkoutUpdate(workout)}>
              Modifica Scheda
            </button>
          )}
        </div>
      ) : (
        <p>Nessuna scheda di allenamento disponibile.</p>
      )}

      {isAdmin && (
        <button onClick={() => {/* Logica per creare una nuova scheda */}}>
          Crea Nuova Scheda
        </button>
      )}
    </div>
  );
}

export default Profile;