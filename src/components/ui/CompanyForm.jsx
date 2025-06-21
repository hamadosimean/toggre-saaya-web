import React, { useState } from "react";

const DOMAIN_OPTIONS = [
  { value: "tech", label: "Technologie" },
  { value: "health", label: "Santé" },
  { value: "education", label: "Éducation" },
  { value: "finance", label: "Finance" },
  { value: "breeding", label: "Élevage" },
  { value: "justice", label: "Justice" },
  { value: "other", label: "Autres" },
];

function CompanyForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    domain: "",
    description: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-blue-700">
        {initialData?.id ? "Modifier la société" : "Ajouter une société"}
      </h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Nom de l'entreprise"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Email */}
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {/* Domain as select */}
      <select
        name="domain"
        value={form.domain}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">-- Choisir un domaine --</option>
        {DOMAIN_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default CompanyForm;
