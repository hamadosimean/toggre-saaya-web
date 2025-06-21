import React, { useState, useEffect } from "react";
import companyAPI from "../services/companyAPI";
import queueAPI from "../services/queueAPI";
import serviceAPI from "../services/serviceAPI";
import BarGraph from "../charts/Bar";
import PieGraph from "../charts/Pie";
import Loader from "../components/ui/Loader";
import PopUp from "../components/ui/PopUp";
import { useAuth } from "../context/AuthContext";

function Statistics() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceStats, setServiceStats] = useState([]);
  const [queueCounts, setQueueCounts] = useState({});
  const [waitingCounts, setWaitingCounts] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const serviceRes = await serviceAPI.getDisplayedServices(user.id);
        const services = serviceRes.data || [];
        setServiceStats(services);

        const queueCountData = {};
        const waitingCountData = {};

        for (const service of services) {
          const [queueRes, waitingRes] = await Promise.all([
            queueAPI.getQueueCount(user.id, service.id),
            queueAPI.getWaitingCount(user.id, service.id),
          ]);
          queueCountData[service.name] = queueRes.data.count;
          waitingCountData[service.name] = waitingRes.data.count;
        }

        setQueueCounts(queueCountData);
        setWaitingCounts(waitingCountData);
      } catch (err) {
        console.error(err);
        setError("Échec de la récupération des statistiques.");
        setShowPopUp(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading) return <Loader />;

  const totalWaiting = Object.values(waitingCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  const totalQueue = Object.values(queueCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  const pieData = Object.keys(waitingCounts).map((serviceName) => ({
    name: serviceName,
    value: waitingCounts[serviceName],
  }));

  const barData = Object.keys(queueCounts).map((serviceName) => ({
    name: serviceName,
    fileAttente: queueCounts[serviceName],
  }));

  return (
    <div className="p-6 space-y-10">
      {error && showPopUp && (
        <PopUp
          message={error}
          type="error"
          onClose={() => setShowPopUp(false)}
        />
      )}

      <h1 className="text-3xl font-bold text-blue-800">
        Statistiques générales
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            Total en attente
          </h2>
          <p className="text-4xl text-red-600 font-bold">{totalWaiting}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total global</h2>
          <p className="text-4xl text-blue-600 font-bold">{totalQueue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Répartition des attentes (camembert)
          </h3>
          <PieGraph data={pieData} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            File d'attente par service (barres)
          </h3>
          <BarGraph data={barData} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
