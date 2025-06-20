import React, { useState, useEffect, useRef } from "react";
import QueueCard from "../components/ui/QueueCard";
import serviceAPI from "../services/serviceAPI";
import { useAuth } from "../context/AuthContext";
import { Maximize2, Minimize2 } from "lucide-react";

function Queue() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { user } = useAuth();

  // Ref to the specific component
  const queueRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await serviceAPI.getDisplayedServices(user.id);
        setServices(response.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      queueRef.current?.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  return (
    <div
      ref={queueRef}
      className="px-4 py-6 w-full flex flex-col gap-6 relative bg-white"
    >
      {/* Fullscreen Button */}
      <button
        onClick={toggleFullScreen}
        className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 transition z-10"
        title={isFullScreen ? "Quitter plein écran" : "Plein écran"}
      >
        {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
      </button>

      <h2 className="text-2xl font-bold text-blue-700 text-center">
        Réserver une file d'attente
      </h2>

      {loading && <p className="text-center text-gray-500">Chargement...</p>}

      {!loading && services.length === 0 && (
        <p className="text-center text-gray-400">Aucun service disponible.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((s) => (
          <QueueCard
            key={s.id}
            service={s.name}
            description={s.description}
            numberQueue={s.currentQueue || "—"}
            userId={user.id}
            serviceId={s.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Queue;
