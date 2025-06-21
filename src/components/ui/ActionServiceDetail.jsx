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
  const [waitingCount, setWaitingCount] = useState(null);

  const fetchQueueData = async (userId, serviceId) => {
    try {
      const queueRes = await queueAPI.getCurrentAndNext(userId, serviceId);
      setCurrentQueue(queueRes.data.current ?? null);

      const waitingRes = await queueAPI.getWaitingCount(userId, serviceId);
      setWaitingCount(waitingRes.data.count ?? 0);
    } catch (err) {
      setError("Échec de la récupération de la file d'attente.");
      setShowPopUp(true);
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await serviceAPI.getDisplayedServices(user.id);
        const found = res.data.find((s) => String(s.id) === String(id));
        if (!found) {
          setError("Service introuvable.");
          setShowPopUp(true);
          return;
        }

        setActionService(found);
        await fetchQueueData(user.id, found.id);
      } catch (err) {
        setError("Échec de la récupération du service.");
        setShowPopUp(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [user.id, id]);

  const handlePerformAction = async (status) => {
    try {
      await queueAPI.performAction(user.id, actionService.id, { status });
      await fetchQueueData(user.id, actionService.id);
    } catch (err) {
      setError(`Échec de l'action : ${status}`);
      setShowPopUp(true);
      console.error(err);
    }
  };

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
        <div>
          <h1 className="text-4xl font-bold text-white">
            {actionService.name}
          </h1>
          {waitingCount !== null && (
            <p className="text-white text-lg mt-2">
              En attente : {waitingCount}
            </p>
          )}
        </div>
        <span className="text-red-500 font-extrabold text-5xl">
          {currentQueue ?? "—"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-6 flex-grow justify-center">
        <button
          onClick={() => handlePerformAction("called")}
          className="w-full bg-blue-600 text-white py-8 rounded-2xl text-4xl font-bold shadow hover:bg-blue-700 transition"
        >
          Suivant
        </button>

        <div className="flex gap-6">
          <button
            onClick={() => handlePerformAction("canceled")}
            className="w-1/2 bg-red-600 text-white py-8 rounded-2xl text-4xl font-bold shadow hover:bg-red-700 transition"
          >
            Annuler
          </button>
          <button
            onClick={() => handlePerformAction("called")}
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
