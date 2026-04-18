import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanagement-gma3.onrender.com/api",  // ✅ UPDATED
});

// Optional: attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;