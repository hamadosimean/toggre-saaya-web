import React from "react";
import { Link } from "react-router";

function ActionServiceCard({ id, name, description }) {
  return (
    <Link
      to={`/dashboard/action/${id}`}
      className="block bg-white p-6 rounded-xl shadow-md border border-blue-600 hover:shadow-lg hover:bg-blue-50 transition-all"
    >
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}

export default ActionServiceCard;
