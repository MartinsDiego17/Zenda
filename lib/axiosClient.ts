import { useAuthStore } from '@/store/AuthStore';
import axios from 'axios';

export const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {
  const session = useAuthStore.getState().session;
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});