import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/api";
import WorkoutPlanCreator from "../components/WorkoutPlanCreator";
import MotivationalQuote from "../components/MotivationalQuote";
import WorkoutPlanViewer from "../components/WorkoutPlanViewer";
import BIAManager from "../components/BIAManager";

const Profile = ({ isAdmin }) => {
  const { id: userIdFromUrl } = useParams();
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching profile for userIdFromUrl:", userIdFromUrl);
        let response;
        if (userIdFromUrl) {
          response = await userService.getUserById(userIdFromUrl);
          console.log("Response from getUserById:", response);
        } else {
          response = await userService.getProfile();
          console.log("Response from getProfile:", response);
        }

        if (response && response.data) {
          setProfile(response.data);
          setUserId(response.data.id || response.data._id);
          console.log("Profile set:", response.data);
          console.log("UserId set:", response.data.id || response.data._id);
        } else {
          throw new Error("Dati del profilo non validi nella risposta");
        }
      } catch (error) {
        console.error("Errore nel recupero del profilo:", error);
        setError("Impossibile caricare il profilo. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userIdFromUrl]);

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile || !userId) {
    return <div>Nessun profilo trovato.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#343434] to-[#797979] flex flex-col items-center text-white pt-8">
      <MotivationalQuote className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center" />

      <h1 className="text-4xl font-bold mb-4">
        {profile.nome} {profile.cognome}
      </h1>

      {isAdmin && (
        <WorkoutPlanCreator
          userId={userId}
          onPlanCreated={(newPlan) => {
            console.log("New plan created:", newPlan);
            // Aggiorna lo stato locale o ricarica la pagina se necessario
          }}
        />
      )}

      <div className="w-full px-4">
        <WorkoutPlanViewer userId={userId} isAdmin={isAdmin} />
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[55%] bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mt-20">
          <h2 className="text-2xl font-bold mb-4">Analisi BIA</h2>
          <BIAManager />
        </div>
      </div>
    </div>
  );
};

export default Profile;
