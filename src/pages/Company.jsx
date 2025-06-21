import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import companyAPI from "../services/companyAPI";
import CompanyCard from "../components/ui/CompanyCard";
import CompanyForm from "../components/ui/CompanyForm";
import ConfirmationModal from "../components/ui/Confirmation";
import PopUp from "../components/ui/PopUp";
import Button from "../components/ui/Button";

function Company() {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const { data } = await companyAPI.getCompanyByUser(user.id);
        setCompany(data);
      } catch (err) {
        handleError("Erreur lors du chargement de la société", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [user]);

  const handleError = (message, error) => {
    setError(`${message}: ${error.message}`);
  };

  const handleSave = async (formData) => {
    setIsLoading(true);
    try {
      const apiCall = isEditing
        ? companyAPI.update(user.id, formData)
        : companyAPI.createCompany(user.id, formData);

      const { data } = await apiCall;
      setCompany(data);
      closeForm();
    } catch (err) {
      handleError("Erreur lors de l'enregistrement de la société", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await companyAPI.delete(user.id);
      setCompany(null);
    } catch (err) {
      handleError("Erreur lors de la suppression de la société", err);
    } finally {
      setShowConfirmDelete(false);
      setIsLoading(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  const openEditForm = () => {
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="w-full bg-gray-50 px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6">
        {error && (
          <PopUp message={error} onClose={() => setError(null)} type="error" />
        )}

        {isLoading && (
          <div className="text-center py-4">
            <span className="animate-spin">⏳</span>
          </div>
        )}

        {!isLoading && (
          <>
            {!company && !showForm && (
              <div className="text-center">
                <Button onClick={() => setShowForm(true)}>
                  Ajouter votre société
                </Button>
              </div>
            )}

            {company && !showForm && (
              <CompanyCard
                company={company}
                onEdit={openEditForm}
                onDelete={() => setShowConfirmDelete(true)}
                isLoading={isLoading}
              />
            )}

            {showForm && (
              <CompanyForm
                initialData={isEditing ? company : {}}
                onSubmit={handleSave}
                onCancel={closeForm}
                isLoading={isLoading}
              />
            )}

            {showConfirmDelete && (
              <ConfirmationModal
                message="Êtes-vous sûr de vouloir supprimer cette société ?"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirmDelete(false)}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Company;
