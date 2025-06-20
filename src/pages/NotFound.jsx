import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oups ! La page que vous cherchez n'existe pas.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
