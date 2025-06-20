import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import userApi from "../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");

    const initAuth = async () => {
      if (savedToken) {
        setToken(savedToken);

        try {
          const response = await userApi.getUser(savedToken);
          setUser(response.data);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("auth_token");
          sessionStorage.removeItem("auth_token");
          setToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
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

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for convenience
export const useAuth = () => useContext(AuthContext);
