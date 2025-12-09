import axios from "axios";

/**
 * Axios client dengan konfigurasi:
 * - Base URL dari environment variable
 * - Timeout configurable
 * - Retry logic untuk 5xx errors
 * - Error normalization
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TIMEOUT = 30000;
const MAX_RETRIES = 0;
const RETRY_DELAY = 1000;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (error) => {
  if (error.code === "ECONNABORTED") return true;
  if (!error.response) return true;
  return error.response.status >= 500;
};

const normalizeError = (error) => {
  if (error.response) {
    return {
      message:
        error.response.data?.message ||
        error.response.statusText ||
        "Server error",
      status: error.response.status,
    };
  }
  if (error.code === "ECONNABORTED") {
    return { message: "Request timeout. Please try again.", status: null };
  }
  return { message: error.message || "Network error.", status: null };
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config._retryCount) config._retryCount = 0;

    if (isRetryable(error) && config._retryCount < MAX_RETRIES) {
      config._retryCount += 1;
      const backoffDelay = RETRY_DELAY * Math.pow(2, config._retryCount - 1);
      await delay(backoffDelay);
      return axiosClient(config);
    }

    return Promise.reject(normalizeError(error));
  }
);

export default axiosClient;

export const http = {
  get: (url, params = {}) => axiosClient.get(url, { params }),
  post: (url, data = {}) => axiosClient.post(url, data),
  put: (url, data = {}) => axiosClient.put(url, data),
  delete: (url) => axiosClient.delete(url),
};
