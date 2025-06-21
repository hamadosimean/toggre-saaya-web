import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Button from "./Button";

function ServiceCard({ id, display, name, description, onUpdate, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md  border-blue-600 border-2 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="flex items-center justify-end space-x-3">
        <div className="flex items-center">
          <span className="text-gray-600 mr-1">Affichage</span>
          <input
            type="checkbox"
            checked={display}
            className="mr-2"
            title="Status d'affichage"
          />
        </div>
        <button
          onClick={() => onUpdate(id)}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Modifier"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800 transition"
          title="Supprimer"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
