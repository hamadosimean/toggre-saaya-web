import React from "react";
import { Link } from "react-router";
function Hero() {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center px-6 md:px-20 py-16">
      <div className="text-center md:text-left max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-800">
          Avec{" "}
          <span className="text-blue-600 font-extrabold">Toggre-Saaya</span>,
          <br />
          dites adieu aux longues files d’attente !
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          Réservez votre tour en quelques clics sur nos tablettes dans les
          administrations publiques.
          <br className="hidden md:inline" />
          Gagnez du temps, simplifiez vos démarches.
        </p>

        <div className="mt-8">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-300"
          >
            Esssayer maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
