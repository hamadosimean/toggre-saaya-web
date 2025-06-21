import React, { useEffect, useState } from "react";
import ActionServiceCard from "../components/ui/ActionServiceCard";
import serviceAPI from "../services/serviceAPI";
import Loader from "../components/ui/Loader";
import PopUp from "../components/ui/PopUp";
import { useAuth } from "../context/AuthContext";
import ShowError from "../components/ui/ShowError";

function Action() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await serviceAPI.getDisplayedServices(user.id);
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services. Please try again.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [user.id]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-4">
      {error && <PopUp message={error} type="error" />}
      {services.length === 0 ? (
        <p className="text-gray-500 text-center">
          <ShowError error={"Aucun service correspond"} />
        </p>
      ) : (
        services.map((service) => (
          <ActionServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            description={service.description}
          />
        ))
      )}
    </div>
  );
}

export default Action;
