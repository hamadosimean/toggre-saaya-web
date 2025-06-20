import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import serviceAPI from "../../services/serviceAPI";
import { useAuth } from "../../context/AuthContext";
import PopUp from "./PopUp";

function AddEditServiceModal({
  isOpen,
  onClose,
  service = null, // pass entire service object for edit
  type = "add",
  onSave, // callback to refresh list
}) {
  const { user } = useAuth();
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceDisplay, setServiceDisplay] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (service && type === "edit") {
      setServiceName(service.name || "");
      setServiceDescription(service.description || "");
      setServiceDisplay(service.display || false);
    } else {
      // Reset for add
      setServiceName("");
      setServiceDescription("");
      setServiceDisplay(false);
    }
  }, [service, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName.trim()) {
      setError("Le nom du service est requis.");
      return;
    }

    try {
      if (type === "add") {
        await serviceAPI.createService(user.id, {
          name: serviceName,
          description: serviceDescription,
          display: serviceDisplay,
        });
        setSuccessMessage("✅ Service ajouté avec succès !");
      } else {
        await serviceAPI.updateService(user.id, service.id, {
          name: serviceName,
          description: serviceDescription,
          display: serviceDisplay,
        });
        setSuccessMessage("✅ Service mis à jour avec succès !");
      }

      setError(null);
      if (onSave) onSave(); // refresh parent list
      setTimeout(() => {
        onClose();
        setSuccessMessage("");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.detail || "Une erreur est survenue.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          {type === "add" ? "Ajouter un service" : "Modifier le service"}
        </h2>

        {error && (
          <p className="text-red-600 mb-3 text-sm text-center">{error}</p>
        )}

        {successMessage && (
          <p className="text-green-600 mb-3 text-sm text-center">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom du service
            </label>
            <input
              id="name"
              type="text"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </div>

          {/* Display Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="display"
              checked={serviceDisplay}
              onChange={(e) => setServiceDisplay(e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor="display" className="text-sm text-gray-700">
              Afficher ce service
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {type === "add" ? "Ajouter" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditServiceModal;
