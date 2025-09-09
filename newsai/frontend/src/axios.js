// frontend/src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend server (note: includes /api)
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
