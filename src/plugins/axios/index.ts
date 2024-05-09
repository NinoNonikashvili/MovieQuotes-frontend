import axios from "axios";
import i18n from "@/plugins/i18n";

const { locale } = i18n.global;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
  headers: { Accept: "application/json" },
  withCredentials: true,
  withXSRFToken: true,
});

instance.interceptors.request.use(
  function (config) {
    if (config.url?.includes("/email/verify")) {
      return config;
    }
    config.params = {
      ...(config.params || {}),
      lang: locale.value,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
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
