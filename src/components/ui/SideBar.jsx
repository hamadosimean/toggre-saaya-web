import React from "react";
import { NavLink } from "react-router";
import ResizableContainer from "resizable-container";
import { useAuth } from "../../context/AuthContext";

function SideBar({ navItems = [] }) {
  const { user } = useAuth();

  console.log(user);

  return (
    <ResizableContainer
      direction="right"
      initialSize={300}
      minSize={200}
      maxSize={500}
      storageKey="my-resize-container"
    >
      <aside className="sticky top-0 flex flex-col p-6 bg-gradient-to-b from-blue-700 to-blue-800 text-white h-screen">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                      flex items-center px-4 py-3 space-x-4 rounded-lg 
                      transition-colors hover:bg-blue-700 hover:text-white 
                      ${isActive ? "bg-blue-900 font-medium" : ""}
                    `
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-blue-500">
          <p className="text-sm text-blue-200 px-4">
            © {new Date().getFullYear()} Toggre Saaya. Tous droits réservés.
          </p>
        </div>
      </aside>
    </ResizableContainer>
  );
}

export default SideBar;
