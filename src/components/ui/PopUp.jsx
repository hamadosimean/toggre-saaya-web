import React, { useEffect } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";

function PopUp({ message, type = "info", onClose, duration = 3000 }) {
  // Auto-close after a duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-500",
    error: "bg-red-100 text-red-800 border-red-500",
    info: "bg-blue-100 text-blue-800 border-blue-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 border-l-4 rounded shadow-lg flex items-start justify-between min-w-[250px] max-w-sm transition-all duration-300 ${typeStyles[type]}`}
    >
      <div className="pr-4">{message}</div>
      <button onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

PopUp.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default PopUp;
