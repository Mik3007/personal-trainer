import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userService } from '../services/api';
import WorkoutPlanCreator from '../components/WorkoutPlanCreator';
import MotivationalQuote from '../components/MotivationalQuote';
import WorkoutPlanViewer from '../components/WorkoutPlanViewer';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { id: userId } = useParams();  // Ottieni l'ID dell'utente dalla rotta (se presente)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;
        if (userId) {
          // Admin visualizza il profilo di un utente specifico
          response = await userService.getUserById(userId); // Chiama l'API per ottenere i dati di un utente specifico
        } else {
          // Utente normale visualizza il proprio profilo
          response = await userService.getProfile(); // Chiama l'API per ottenere i dati del proprio profilo
        }
        setProfile(response.data);
      } catch (error) {
        console.error('Errore nel recupero del profilo:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#797979] flex flex-col justify-center items-center text-white p-4">
      <MotivationalQuote className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center" />
      
      <h1 className="text-4xl font-bold mb-4">
        {profile.nome} {profile.cognome}
      </h1>
      
      {userId ? (
        <>
        <WorkoutPlanCreator userId={userId} />
        <WorkoutPlanViewer userId={userId} />
        </>  // Passa lo userId al componente WorkoutPlanCreator
      ) : (
        <>
        <p>Questo è il tuo profilo personale.</p>
        <WorkoutPlanViewer userId={userId} />
        </>  // Visualizza messaggio per il profilo personale
      )}
    </div>
  );
};

export default Profile;
