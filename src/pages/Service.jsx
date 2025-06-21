import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import serviceAPI from "../services/serviceAPI";
import { useAuth } from "../context/AuthContext";
import ServiceCard from "../components/ui/ServiceCard";
import ShowError from "../components/ui/ShowError";
import Loader from "../components/ui/Loader";
import Confirmation from "../components/ui/Confirmation";
import AddEditServiceModal from "../components/ui/EditServiceCard";
import PopUp from "../components/ui/PopUp";
function Service() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalType, setModalType] = useState(""); // "add" | "edit"
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch services from API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await serviceAPI.getCompanyServices(user.id);
      setServices(response.data || []);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      setServices([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchServices();
    }
  }, [user?.id]);

  const handleAddClick = () => {
    setSelectedService(null);
    setModalType("add");
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setModalType("edit");
  };

  const handleSave = async () => {
    setModalType("");
    setSelectedService(null);
    await fetchServices();
  };

  const handleDelete = async () => {
    try {
      await serviceAPI.deleteService(user.id, selectedService.id);
      await fetchServices();
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      <PopUp message={`"Erreur de suppression", ${error}`} type="error" />;
    } finally {
      setShowConfirmation(false);
      setSelectedService(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  // if (error) return <PO error={error} />;

  return (
    <div className="px-4 py-6 w-full flex flex-col gap-6 relative bg-white">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">Services</h2>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          <PlusCircle size={20} />
          Ajouter un service
        </button>
      </div>

      {/* Service Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              display={service.display}
              name={service.name}
              description={service.description}
              onUpdate={() => handleEditClick(service)}
              onDelete={() => {
                setSelectedService(service);
                setShowConfirmation(true);
              }}
            />
          ))}
        </div>
      ) : (
        <ShowError error="Aucun service disponible." />
      )}

      {/* Add/Edit Modal */}
      {(modalType === "add" || modalType === "edit") && (
        <AddEditServiceModal
          type={modalType}
          isOpen={true}
          onClose={() => {
            setModalType("");
            setSelectedService(null);
          }}
          service={selectedService}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {showConfirmation && selectedService && (
        <Confirmation
          title="Confirmation de suppression"
          message={`Supprimer le service "${selectedService.name}" ?`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

export default Service;
