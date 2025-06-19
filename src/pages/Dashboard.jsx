import React from "react";
import SideBar from "../components/ui/SideBar";
import { Outlet } from "react-router";
function Dashboard() {
  const navItems = [
    {
      path: "/dashboard/company",
      label: "Company",
    },
    {
      path: "/dashboard/service",
      label: "Service",
    },
    {
      path: "/dashboard/queue",
      label: "Queue",
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
