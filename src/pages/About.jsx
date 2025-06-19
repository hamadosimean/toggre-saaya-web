import React from "react";
import heroImage from "../assets/toogre-saaya.png";

function About() {
  return (
    <section className="min-h-screen px-6 py-16 md:px-20 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
            À propos de Toggre-Saaya
          </h1>

          <p className="text-lg leading-relaxed mb-4">
            <strong>Toggre-Saaya</strong> — aussi connu sous le nom{" "}
            <strong>FreeQueue</strong> — est une solution numérique conçue pour
            mettre fin aux longues files d’attente dans les administrations
            publiques. Grâce à notre système intuitif, les citoyens peuvent
            réserver leur tour en quelques clics depuis une tablette.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Notre objectif est de moderniser les services publics en rendant les
            démarches plus rapides, plus transparentes, et moins stressantes.
          </p>

          <p className="text-md text-gray-500 mt-6 italic">
            « Fini les longues queues, vive les démarches intelligentes. »
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full h-auto rounded-lg overflow-hidden shadow">
          <img
            src={heroImage}
            alt="Illustration de Toggre-Saaya"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
