import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 1000,
  headers: { Accept: "application/json" },
  withCredentials: true,
  withXSRFToken: true,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // handle 401 419 cors error here
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
