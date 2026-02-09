import axios from "axios";
import { AuthUser } from "../context/AuthContext";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";
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

axiosClient.interceptors.response.use(
  (response) => response, // If the request is successful, just return the response
  (error) => {
    // Check if error is 401 (Unauthorized) which usually means token expired
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login or reload the page to reset the app state
      window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
