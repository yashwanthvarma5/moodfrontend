import axios from "axios";

const API = axios.create({
  baseURL: "https://moodbackend-w2s8.onrender.com/api", // ✅ Your deployed backend
});

API.interceptors.request.use((req: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer token`;
  }
  return req;
});

export default API;
