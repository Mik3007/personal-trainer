import React, { useState, useEffect } from 'react';
import MotivationalQuote from '../components/MotivationalQuote';
import WorkoutPlanCreator from '../components/WorkoutPlanCreator';  // Importa il componente
import { userService } from '../services/api';

const Profile = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Tentativo di recupero del profilo utente');
        const response = await userService.getProfile();  // Ottieni i dati del profilo utente
        console.log('Risposta profilo utente:', response.data);
        setUserId(response.data._id);  // Imposta lo userId
      } catch (error) {
        console.error('Errore nel recupero del profilo utente:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#797979] flex flex-col justify-center items-center text-white p-4">
      <MotivationalQuote className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center" />
      
      {userId ? (
        <WorkoutPlanCreator userId={userId} />  // Passa lo userId al componente WorkoutPlanCreator
      ) : (
        <p>Loading...</p>  // Visualizza un messaggio di caricamento fino a quando lo userId non è disponibile
      )}
    </div>
  );
};

export default Profile;
