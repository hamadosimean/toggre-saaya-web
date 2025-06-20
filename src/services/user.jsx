import axios from "axios";
import authConfig from "./authConfig";

const API = axios.create({
  baseURL: authConfig.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const userApi = {
  // Register a new user
  register: (username, password, email) =>
    API.post("/users/", { username, password, email }),

  // Login and get auth token
  login: (username, password) =>
    API.post("/token/login/", { username, password }),

  // Logout and invalidate token
  logout: (token) =>
    API.post("/token/logout/", null, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  // Get current user info
  getUser: (token) =>
    API.get("/users/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),

  // Password reset request
  resetPassword: (email) => API.post("/users/reset_password/", { email }),

  // Password reset confirmation (after email)
  confirmResetPassword: (uid, token, new_password) =>
    API.post("/users/reset_password_confirm/", {
      uid,
      token,
      new_password,
    }),
};

export default userApi;
