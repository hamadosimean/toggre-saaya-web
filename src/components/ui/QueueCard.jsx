import React, { useState } from "react";
import PropTypes from "prop-types";
import queueAPI from "../../services/queueAPI";
import QueueDisplay from "./QueueDisplay";

function QueueCard({ service, description, userId, serviceId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [queueNumber, setQueueNumber] = useState(null);
  const [message, setMessage] = useState({ text: "", isError: false });

  const handleReserveQueue = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const response = await queueAPI.reserveSlot(userId, serviceId);
      setQueueNumber(response.data.number);
      setMessage({ text: "✅ Réservation réussie !", isError: false });
    } catch (error) {
      console.error("Erreur de réservation:", error);
      setMessage({ text: "❌ Échec de la réservation", isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleReserveQueue}
        disabled={isLoading}
        aria-busy={isLoading}
        className={`
          w-full text-left rounded-xl px-6 py-5 border-2 border-blue-600 
          bg-white shadow-md hover:shadow-lg transition duration-200
          ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        `}
      >
        {/* Service Info */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-blue-800">{service}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        {/* Message */}
        {message.text && (
          <p
            className={`mt-2 text-sm ${
              message.isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </button>

      {/* Queue Display */}
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

QueueCard.propTypes = {
  service: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default QueueCard;
