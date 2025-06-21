import React from "react";

function CompanyCard({ company, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <h2 className="text-xl font-bold text-blue-700">{company.name}</h2>
      <p className="text-sm text-gray-600">📧 {company.email}</p>
      <p className="text-sm text-gray-600">🏢 Domaine: {company.domain}</p>
      <p className="text-sm text-gray-500">{company.description}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-800 text-white py-1 px-3 rounded"
        >
          Modifier
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
