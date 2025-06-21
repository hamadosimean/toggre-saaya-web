import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import serviceAPI from "../../services/serviceAPI";
import queueAPI from "../../services/queueAPI";
import Loader from "./Loader";
import PopUp from "./PopUp";

function ActionServiceDetailCard() {
  const { user } = useAuth();
  const { id } = useParams();

  const [actionService, setActionService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentQueue, setCurrentQueue] = useState(null);

  const fetchQueueData = async (userId, serviceId) => {
    try {
      const queueRes = await queueAPI.getCurrentAndNext(userId, serviceId);
      setCurrentQueue(queueRes.data.current);
    } catch (err) {
      setError("Failed to fetch queue.");
      setShowPopUp(true);
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchActionService = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await serviceAPI.getDisplayedServices(user.id);
        const service = response.data.find((s) => s.id == id);
        if (!service) {
          setError("Service not found.");
          setShowPopUp(true);
          return;
        }

        setActionService(service);
        await fetchQueueData(user.id, service.id);
      } catch (err) {
        setError("Failed to fetch service. Please try again.");
        setShowPopUp(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActionService();
  }, [user.id, id]);

  const handlePerformAction = async (status) => {
    try {
      await queueAPI.performAction(user.id, actionService.id, { status });
      console.log(`${status} action performed`);
      await fetchQueueData(user.id, actionService.id);
    } catch (err) {
      setError(`Échec de l'action '${status}'.`);
      setShowPopUp(true);
      console.error(err);
    }
  };

  const handleNext = () => handlePerformAction("called"); // Suivant
  const handleCancelled = () => handlePerformAction("canceled"); // Annuler
  const handleCalled = () => handlePerformAction("called"); // Appelle

  if (loading) return <Loader />;
  if (!actionService) return null;

  return (
    <div className="h-screen w-screen flex flex-col bg-white p-6">
      {error && showPopUp && (
        <PopUp
          message={error}
          type="error"
          onClose={() => setShowPopUp(false)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center p-8 bg-black rounded-lg mb-6 h-28">
        <h1 className="text-4xl font-bold text-white">{actionService.name}</h1>
        <span className="text-red-500 font-extrabold text-4xl">
          {currentQueue ?? "—"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 flex-grow justify-center">
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-8 rounded-2xl text-4xl font-bold shadow hover:bg-blue-700 transition"
        >
          Suivant
        </button>

        <div className="flex gap-6">
          <button
            onClick={handleCancelled}
            className="w-1/2 bg-red-600 text-white py-8 rounded-2xl text-4xl font-bold shadow hover:bg-red-700 transition"
          >
            Annuler
          </button>

          <button
            onClick={handleCalled}
            className="w-1/2 bg-green-600 text-white py-8 rounded-2xl text-4xl font-bold shadow hover:bg-green-700 transition"
          >
            Appelle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionServiceDetailCard;
