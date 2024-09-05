import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/api";
import WorkoutPlanCreator from "../components/WorkoutPlanCreator";
import MotivationalQuote from "../components/MotivationalQuote";
import WorkoutPlanViewer from "../components/WorkoutPlanViewer";
import BIAManager from "../components/BIAManager";
import ExerciseCreator from "../components/ExerciseCreator";

const Profile = ({ isAdmin }) => {
  const { id: userIdFromUrl } = useParams();
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Controllo mobile

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <h1 className="text-xl font-bold mb-4">
        {profile.nome} {profile.cognome}
      </h1>

      {isAdmin && (
        <>
          <WorkoutPlanCreator
            userId={userId}
            onPlanCreated={(newPlan) => {
              console.log("New plan created:", newPlan);
              // Aggiorna lo stato locale o ricarica la pagina se necessario
            }}
          />
          <ExerciseCreator /> {/* Nuovo componente aggiunto */}
        </>
      )}

      <div className="w-full px-4">
        <WorkoutPlanViewer userId={userId} isAdmin={isAdmin} />
      </div>

      {/* Layout per BIA, diverso per mobile */}
      <div
        className={`w-full flex justify-center px-4 ${
          isMobile ? "mt-4" : "mt-20"
        }`}
      >
        <div
          className={`w-full ${
            isMobile ? "max-w-full" : "max-w-[55%]"
          } bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6`}
        >
          <h2 className="text-2xl font-bold mb-4">Analisi BIA</h2>
          <BIAManager
            userId={isAdmin && userIdFromUrl ? userIdFromUrl : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
