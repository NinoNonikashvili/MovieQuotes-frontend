import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

//add interceptors

export default instance;
