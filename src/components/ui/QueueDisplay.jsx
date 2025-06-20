import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import { motion } from "framer-motion";

function QueueDisplay({ queueNumber, service, onCancel }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      onCancel(); // auto-dismiss
    }, 5000);

    return () => clearTimeout(timeout);
  }, [queueNumber, onCancel]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl px-6 py-8 max-w-sm w-full relative text-center"
      >
        {/* Close Icon */}
        <button
          onClick={() => {
            setShow(false);
            onCancel();
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition"
          aria-label="Fermer"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          Votre numéro d’ordre
        </h1>

        {/* Queue Number */}
        <p className="text-4xl font-extrabold text-red-600 mb-4">
          {queueNumber}
        </p>

        {/* Service */}
        <p className="text-sm text-gray-600 mb-6">
          Service réservé :{" "}
          <span className="font-medium text-gray-800">{service}</span>
        </p>

        {/* Close Button */}
        <Button
          onClick={() => {
            setShow(false);
            onCancel();
          }}
        >
          Fermer
        </Button>
      </motion.div>
    </div>
  );
}

export default QueueDisplay;
