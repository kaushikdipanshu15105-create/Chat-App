import axios from "axios";

// This is no longer needed. The Vite proxy handles the full URL.
// const DB_URL = import.meta.env.VITE_DB_URL;

export const axiosInstance = axios.create({
  // CRITICAL FIX: Set the baseURL to the same path as your proxy
  baseURL: "/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});