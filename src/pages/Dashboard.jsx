import React from "react";
import SideBar from "../components/ui/SideBar";
import { Outlet } from "react-router";
import {
  ClipboardList,
  Settings,
  View,
  ZapIcon,
  Server,
  Building,
} from "lucide-react";
function Dashboard() {
  const navItems = [
    {
      path: "/dashboard/company",
      label: "Company",
      icon: <Building size={20} />,
    },
    {
      path: "/dashboard/service",
      label: "Service",
      icon: <Server size={20} />,
    },
    {
      path: "/dashboard/queue",
      label: "Queue",
      icon: <ClipboardList size={20} />,
    },
    {
      path: "/dashboard/action",
      label: "Action",
      icon: <ZapIcon size={20} />,
    },
    {
      path: "/dashboard/display",
      label: "Affichage",
      icon: <View size={20} />,
    },
    {
      path: "/dashboard/settings",
      label: "Paramètres",
      icon: <Settings size={20} />,
    },
  ];
  return (
    <div className="flex w-full h-screen overflow-y-auto space-x-4">
      <SideBar navItems={navItems} />
      {/* Content */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
