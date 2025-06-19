import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SideBar({ navItems = [] }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar_collapsed") === "true";
  });

  // Auto-collapse for mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", collapsed.toString());
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={`sticky top-0 h-screen bg-gradient-to-b from-blue-700 to-blue-800 text-white transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      } flex flex-col justify-between shadow-lg overflow-hidden`}
    >
      {/* Top section with toggle */}
      <div>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          {!collapsed && (
            <span className="font-bold text-lg">Toggre Saaya</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path} className="group relative">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                      flex items-center px-4 py-3 space-x-3 transition-all 
                      duration-200 hover:bg-blue-700 rounded-lg ${
                        isActive ? "bg-blue-900 font-semibold" : ""
                      }
                    `
                  }
                >
                  <div className="text-white">{item.icon}</div>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full top-2 ml-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer always at bottom */}
      <div className="p-4 text-xs text-blue-200 border-t border-blue-600">
        {!collapsed && (
          <p className="text-center">
            © {new Date().getFullYear()} Toggre Saaya. All rights reserved.
          </p>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
