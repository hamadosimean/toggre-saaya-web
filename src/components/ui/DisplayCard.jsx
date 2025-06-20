import React from "react";

function DisplayCard({ called, next, service, description }) {
  return (
    <div className="flex flex-col bg-gray-200 rounded-md p-6 shadow-lg w-full max-w-md mx-auto">
      {/* Service Title */}
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{service}</h2>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4">{description}</p>

      {/* Queue Information */}
      <div className="flex justify-between text-center">
        <div className="flex-1">
          <h3 className="text-gray-500 text-sm mb-1">Appelé</h3>
          <p className="text-3xl font-bold text-blue-700">{called}</p>
        </div>
        <div className="flex-1">
          <h3 className="text-gray-500 text-sm mb-1">Suivant</h3>
          <p className="text-3xl font-bold text-green-600">{next}</p>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
