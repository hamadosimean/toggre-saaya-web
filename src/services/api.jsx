import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://144.91.109.155:1154/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`,
  },
  // withCredentials: true, // Enable cookies to be sent with requests
  timeout: 10000, // Set a timeout for requests
});

export default apiClient;
