import axios from "axios";
import { AuthUser } from "../context/AuthContext";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
