import React from "react";
import SideBar from "../components/ui/SideBar";
import { Outlet } from "react-router";
import { Building, HouseIcon, ClipboardList } from "lucide-react";
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
      icon: <HouseIcon size={20} />,
    },
    {
      path: "/dashboard/queue",
      label: "Queue",
      icon: <ClipboardList size={20} />,
    },
  ];
  return (
    <div className="flex">
      <SideBar navItems={navItems} />
      <Outlet />
    </div>
  );
}

export default Dashboard;
