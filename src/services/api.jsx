import axios from "axios";
import Config from "./config";
const apiClient = axios.create({
  baseURL: Config.DEV_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Token ${localStorage.getItem("auth_token") || ""}`,
  },
});

export default apiClient;
