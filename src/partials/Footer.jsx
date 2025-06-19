import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold">Toggre-Saaya</h2>
          <p className="mt-4 text-sm text-gray-300">
            Simplifiez vos files d'attente dans les services publics grâce à
            notre système de réservation numérique.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                À propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Connexion
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info (Optional) */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-300">
            support@toggre-saaya.bf <br />
            (+226) 70 00 00 00
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blue-800 text-center py-4 text-sm text-gray-200">
        © {new Date().getFullYear()} Toggre-Saaya. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
