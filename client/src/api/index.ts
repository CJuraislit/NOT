import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { authStoreGetToken, authStoreLogout } from '/store/auth.store';

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$authHost.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authStoreGetToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

$authHost.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response && error.response.status === 401) {
      authStoreLogout();
    }
    return Promise.reject(error);
  },
);

export { $host, $authHost };
