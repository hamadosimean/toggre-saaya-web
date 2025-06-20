import React from "react";

function DisplayCard({ called, next, service, description }) {
  return (
    <div
      className="flex flex-col bg-white rounded-lg p-6 shadow-md border border-gray-200 w-full max-w-md mx-auto"
      role="region"
      aria-label={`Information pour le service ${service}`}
    >
      {/* Service Title */}
      <h2 className="text-xl font-semibold text-blue-900 mb-2">{service}</h2>

      {/* Description */}
      <p className="text-sm text-gray-800 mb-4">{description}</p>

      {/* Queue Information */}
      <div className="flex justify-between text-center border-t pt-4 mt-4">
        <div className="flex-1">
          <h3 className="text-gray-600 text-sm mb-1">Appelé</h3>
          <p
            className="text-3xl font-bold text-blue-800"
            aria-label={`Numéro appelé: ${called}`}
          >
            {called}
          </p>
        </div>
        <div className="flex-1 border-l pl-4">
          <h3 className="text-gray-600 text-sm mb-1">Suivant</h3>
          <p
            className="text-3xl font-bold text-emerald-700"
            aria-label={`Numéro suivant: ${next}`}
          >
            {next}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
