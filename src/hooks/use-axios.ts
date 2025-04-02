import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ENV } from '@/utils/env';

// Default config for axios instance
const defaultConfig: AxiosRequestConfig = {
  baseURL: ENV.API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create a custom axios instance
export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    ...defaultConfig,
    ...config,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify the request config here (add headers, auth tokens, etc.)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Default axios instance
export const axiosInstance = createAxiosInstance();

// Hook for using axios with authentication
export const useAxios = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Create a new instance with auth headers
  const authAxios = createAxiosInstance();

  // Add auth token to requests
  authAxios.interceptors.request.use((config) => {
    if (user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  // Handle auth errors
  authAxios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;
      
      // Handle authentication errors
      if (status === 401) {
        toast({
          title: "Session expired",
          description: "Please sign in again to continue",
          variant: "destructive",
        });
        logout();
      }
      
      // Handle server errors
      if (status === 500) {
        toast({
          title: "Server error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
      
      return Promise.reject(error);
    }
  );

  // Helper methods for common operations
  const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return authAxios.get<T, AxiosResponse<T>>(url, config).then((res) => res.data);
  };

  const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return authAxios.post<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
  };

  const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return authAxios.put<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
  };

  const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return authAxios.patch<T, AxiosResponse<T>>(url, data, config).then((res) => res.data);
  };

  const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return authAxios.delete<T, AxiosResponse<T>>(url, config).then((res) => res.data);
  };

  return {
    axios: authAxios,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};
