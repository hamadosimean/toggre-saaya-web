import React, { useState } from "react";
import { LiquidGlass } from "@liquidglass/react";
import placeholder from "../assets/toogre-saaya.png";
import PopUp from "../components/ui/PopUp";
function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setIsSending(true);
      setIsSent(false);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSending(false);
      setIsSent(true);
      setError("");
      setEmail("");
      setMessage("");
      setName("");
    }
  };

  if (isSending) return <PopUp message="Envoi en cours..." type="info" />;
  if (isSent)
    return <PopUp message="Message envoyé avec succès !" type="success" />;
  if (error) return <PopUp message={error} type="error" />;

  return (
    <section className="min-h-screen px-6 py-16 md:px-20 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Info + Form */}
        <LiquidGlass
          borderRadius={8}
          blur={0.5}
          contrast={1.2}
          brightness={1.1}
          saturation={1.2}
        >
          <div className="p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              Contactez-nous
            </h1>

            <p className="text-lg mb-6">
              Une question ? Une demande ? N’hésitez pas à nous écrire. Nous
              vous répondrons dans les plus brefs délais.
            </p>

            {/* Dummy Contact Details */}
            <div className="mb-8 text-sm text-gray-600 space-y-2">
              <p>
                <strong>Email :</strong> support@toggre-saaya.bf
              </p>
              <p>
                <strong>Téléphone :</strong> +226 73439675 / 55674512 / 79143616
              </p>
              <p>
                <strong>Adresse :</strong> 123, Avenue de la Réduction des
                Files, Ouagadougou
              </p>
            </div>

            {/* Contact Form */}
            <form className="space-y-4" method="POST" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Votre message..."
                  className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                disabled={!email || !message || !name}
              >
                Envoyer
              </button>
            </form>
          </div>
        </LiquidGlass>
        {/* Placeholder Image */}
        <div className="w-full h-64 md:h-full bg-gray-200 rounded-lg flex items-center justify-center shadow">
          <img
            src={placeholder}
            alt="placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;
