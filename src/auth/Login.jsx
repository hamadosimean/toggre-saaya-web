import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import userApi from "../services/user";
import PopUp from "../components/ui/PopUp";
import Loader from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(
    localStorage.getItem("show_password") === "true"
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    const newValue = !showPassword;
    setShowPassword(newValue);
    localStorage.setItem("show_password", newValue.toString());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await userApi.login(username, password);
      const authToken = response.data.auth_token;

      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");

      if (rememberMe) {
        localStorage.setItem("auth_token", authToken);
      } else {
        sessionStorage.setItem("auth_token", authToken);
      }

      login(authToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.non_field_errors?.[0] ||
        err?.message ||
        "Une erreur est survenue pendant la connexion.";
      setError(message);
      setShowPopUp(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      {showPopUp && (
        <PopUp
          message={error}
          onClose={() => setShowPopUp(false)}
          type="error"
        />
      )}

      <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Connexion
        </h2>

        <form onSubmit={handleLogin} autoComplete="on" className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-blue-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Se souvenir de moi
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            disabled={!username || !password}
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
