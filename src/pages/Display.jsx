import React, { useState, useEffect, useRef } from "react";
import DisplayCard from "../components/ui/DisplayCard";
import Infos from "../components/ui/Infos";
import serviceAPI from "../services/serviceAPI";
import queueAPI from "../services/queueAPI";
import { useAuth } from "../context/AuthContext";
import { Maximize2, Minimize2 } from "lucide-react";
import Loader from "../components/ui/Loader";
import ShowError from "../components/ui/ShowError";

function Display() {
  const { user } = useAuth();
  const [servicesWithQueue, setServicesWithQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const displayRef = useRef(null);
  const [error, setError] = useState(null);

  // Fetch queues
  useEffect(() => {
    async function fetchServicesWithQueue() {
      try {
        const response = await serviceAPI.getDisplayedServices(user.id);
        const services = response.data || [];

        const servicesWithQueueData = await Promise.all(
          services.map(async (service) => {
            try {
              const queueRes = await queueAPI.getCurrentAndNext(
                user.id,
                service.id
              );
              return {
                ...service,
                called: queueRes.data?.current || null,
                next: queueRes.data?.next_queue || null,
              };
            } catch (err) {
              console.warn(`Queue error for service ${service.name}`, err);
              return {
                ...service,
                called: null,
                next: null,
              };
            }
          })
        );

        setServicesWithQueue(servicesWithQueueData);
      } catch (error) {
        setError(error.message);
        setServicesWithQueue([]);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchServicesWithQueue();
    }
  }, [user?.id]);

  // Handle fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      displayRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div
      ref={displayRef}
      className="relative w-full px-4 py-6 flex flex-col gap-4 overflow-auto bg-white"
    >
      {/* Fullscreen Toggle Button */}
      {!isFullscreen && (
        <button
          onClick={handleToggleFullscreen}
          className="absolute z-100 top-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      )}

      {/* Sliding Info Banner */}
      <Infos info="Bienvenue à Toogre Sayaa. Veuillez patienter jusqu'à votre appel." />

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">
          <Loader />
        </p>
      )}

      {/* No Services */}
      {!loading && servicesWithQueue.length === 0 && (
        <p className="text-center text-gray-400">
          <ShowError
            error={("Aucun service n'est disponible pour le moment.", error)}
          />
        </p>
      )}

      {/* Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {servicesWithQueue.map((service) => (
          <DisplayCard
            key={service.id}
            called={service.called || "—"}
            next={service.next || "—"}
            service={service.name}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Display;
