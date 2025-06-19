import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Confirmation = ({ onConfirm, onCancel, message, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-md border"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h2 id="confirm-title" className="text-xl font-bold mb-4">
          {title || "Confirmation"}
        </h2>

        <p className="mb-6 text-gray-700">
          {message || "Souhaitez-vous continuer avec cette action ?"}
        </p>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer"
            onClick={onCancel}
          >
            Annuler
          </button>
          <Button onClick={onConfirm}>Continuer</Button>
        </div>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Confirmation;
