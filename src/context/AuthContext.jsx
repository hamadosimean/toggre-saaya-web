import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import userApi from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) setToken(savedToken);
    async function fetchUser() {
      if (savedToken) {
        const response = await userApi.getUser(savedToken);
        setUser(response.data);
      }
    }
    fetchUser();
  }, []);

  const login = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    navigate("/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for convenience
export const useAuth = () => useContext(AuthContext);
