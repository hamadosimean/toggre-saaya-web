import React, { useState } from "react";
import queueAPI from "../../services/queueAPI";
import QueueDisplay from "./QueueDisplay";

function QueueCard({ service, description, userId, serviceId }) {
  const [loading, setLoading] = useState(false);
  const [queueNumber, setQueueNumber] = useState(null);
  const [message, setMessage] = useState("");

  const handleReserveQueue = async () => {
    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await queueAPI.reserveSlot(userId, serviceId);
      setQueueNumber(response.data.number);
      setMessage("✅ Réservation réussie !");
    } catch (error) {
      console.error("Erreur de réservation:", error);
      setMessage("❌ Échec de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleReserveQueue}
        disabled={loading}
        className={`w-full text-left bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 ${
          loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
      >
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-blue-800">{service}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {message && (
          <p
            className={`mt-3 text-sm ${
              message.includes("Réussie") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </button>

      {queueNumber && (
        <QueueDisplay
          queueNumber={queueNumber}
          onCancel={() => setQueueNumber(null)}
          service={service}
        />
      )}
    </>
  );
}

export default QueueCard;
