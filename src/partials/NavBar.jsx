import React, { useState } from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";
import logo from "../assets/logo_toogre_sayaa.png";
import { MenuIcon, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Confirmation from "../components/ui/Confirmation";
import UserProfileCard from "../components/ui/UserProfileCard";

function NavBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const toggleProfile = () => setShowProfile((prev) => !prev);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    isAuthenticated && { name: "Dashboard", path: "/dashboard" },
    !isAuthenticated && { name: "Login", path: "/login" },
  ].filter(Boolean); // Remove null/false entries

  return (
    <>
      <header className="bg-white shadow-md border-b border-blue-600 relative z-50">
        <div className="flex items-center justify-between px-4 md:px-10 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Toogre Sayaa Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-blue-700">
              Toogre Sayaa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
            <ul className="flex space-x-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-blue-600 transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {isAuthenticated && (
              <div className="relative">
                <Button onClick={toggleProfile}>Profile</Button>
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-72 z-50">
                    <UserProfileCard
                      user={user}
                      onLogout={() => {
                        setShowProfile(false);
                        setShowConfirmation(true);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <nav className="md:hidden px-4 pb-4 bg-white border-t border-gray-200">
            <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="block hover:text-blue-600 transition duration-300"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {isAuthenticated && (
              <div className="mt-4">
                <Button onClick={toggleProfile}>Profile</Button>
                {showProfile && (
                  <div className="mt-2">
                    <UserProfileCard
                      user={user}
                      onLogout={() => {
                        setIsMobileOpen(false);
                        setShowProfile(false);
                        setShowConfirmation(true);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </nav>
        )}
      </header>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <Confirmation
          message="Êtes-vous sûr de vouloir vous déconnecter ?"
          title="Confirmation de déconnexion"
          onConfirm={() => {
            logout();
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default NavBar;
