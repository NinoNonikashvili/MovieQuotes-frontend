import axios, { AxiosError } from "axios";
import i18n from "@/plugins/i18n";
import router from "@/router";

const { locale } = i18n.global;

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 5000,
  headers: { Accept: "application/json" },
  withCredentials: true,
  withXSRFToken: true,
});

instance.interceptors.request.use(
  function (config) {
    if (
      config.url?.includes("/email/verify") ||
      config.url?.includes("broadcasting/auth")
    ) {
      return config;
    }
    config.params = {
      ...(config.params || {}),
      lang: locale.value,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // handle 401 419 cors error here
    const err = error as AxiosError;
    if (err?.response?.status && err?.response?.status >= 500) {
      router.push({ name: "server-error" });
    } else if (
      err?.response?.status &&
      (err?.response?.status === 401 || err?.response?.status === 419)
    ) {
      router.push({ path: "/" });
    }
    return Promise.reject(error);
  },
);

export default instance;
