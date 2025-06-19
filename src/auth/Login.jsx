import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import userApi from "../services/user";
import PopUp from "../components/ui/PopUp";
import { Eye, EyeOff } from "lucide-react";

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

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) navigate("/dashboard", { replace: true });
  }, [navigate]);

  const togglePasswordVisibility = () => {
    const newValue = !showPassword;
    setShowPassword(newValue);
    localStorage.setItem("show_password", newValue.toString());
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    localStorage.removeItem("auth_token");

    try {
      const response = await userApi.login(username, password);

      if (rememberMe) {
        localStorage.setItem("auth_token", response.data.auth_token);
      } else {
        sessionStorage.setItem("auth_token", response.data.auth_token);
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.non_field_errors?.[0] ||
        err?.message ||
        "An error occurred during login.";
      setError(message);
      setShowPopUp(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showPopUp && (
        <PopUp
          message={error}
          onClose={() => setShowPopUp(false)}
          type="error"
        />
      )}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Remember Me */}
          <div className="mb-6 flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username || !password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
